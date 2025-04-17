import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import { getSessionAction } from "@/actions/get-session-action";
import { db } from "@/db";
import { Post } from "@/types/post-type";

const sortBySchema = z.enum(["points", "recent"]);
const sortOrderSchema = z.enum(["asc", "desc"]);

const paginationSchema = z.object({
	limit: z.number({ coerce: true }).optional().default(10),
	page: z.number({ coerce: true }).optional().default(1),
	sortBy: sortBySchema.optional().default("points"),
	sortOrder: sortOrderSchema.optional().default("desc"),
	author: z.string().optional(),
	site: z.string().optional(),
});

export const GET = async (req: NextRequest) => {
	try {
		const session = await getSessionAction();

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { searchParams } = req.nextUrl;
		const validatedQuery = paginationSchema.safeParse(
			Object.fromEntries(searchParams)
		);

		if (!validatedQuery.success) {
			return NextResponse.json(
				{ message: "Invalid query parameters", errors: validatedQuery.error },
				{ status: 400 }
			);
		}

		const { limit, page, sortBy, sortOrder, author, site } =
			validatedQuery.data;

		const offset = (page - 1) * limit;
		const sortByColumn = sortBy === "points" ? "points" : "createdAt";
		const sortOrderValue = sortOrder === "desc" ? "desc" : "asc";

		const whereClause = {
			userId: author ? author : undefined,
			url: site ? site : undefined,
		};

		const count = await db.post.count({
			where: whereClause,
		});

		const posts = await db.post.findMany({
			where: whereClause,
			orderBy: {
				[sortByColumn]: sortOrderValue,
			},
			skip: offset,
			take: limit,
			select: {
				id: true,
				title: true,
				url: true,
				content: true,
				points: true,
				commentCount: true,
				createdAt: true,
				updatedAt: true,
				author: {
					select: {
						id: true,
						username: true,
						name: true,
						displayUsername: true,
						image: true,
					},
				},
				// Only include postUpvotes when user is authenticated
				postUpvotes: session ? { where: { userId: session.user.id } } : false,
			},
		});

		const transformedPosts = posts.map((post) => ({
			...post,
			isUpvoted: session ? post.postUpvotes.length > 0 : false,
			createdAt: post.createdAt.toISOString(),
			updatedAt: post.updatedAt.toISOString(),
			postUpvotes: undefined,
		}));

		return NextResponse.json({
			data: transformedPosts as Post[],
			pagination: {
				page: Number(page),
				totalPages: Math.ceil(count / Number(limit)),
			},
		});
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const POST = async (req: NextRequest) => {
	try {
		const { title, url, content } = await req.json();

		const session = await getSessionAction();

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const newPost = await db.post.create({
			data: {
				title,
				url,
				content,
				userId: session.user.id,
			},
			select: {
				id: true,
			},
		});

		return NextResponse.json({ data: { postId: newPost.id } });
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
