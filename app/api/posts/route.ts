import { NextRequest, NextResponse } from "next/server";

import { getSessionAction } from "@/actions/get-session-action";
import { db } from "@/db";
import { Post } from "@/types/post-type";

export const GET = async (req: NextRequest) => {
	try {
		const session = await getSessionAction();

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { searchParams } = req.nextUrl;

		const limit = searchParams.get("limit") || 10;
		const page = searchParams.get("page") || 1;
		const sortBy = searchParams.get("sortBy") || "points";
		const sortOrder = searchParams.get("sortOrder") || "desc";
		const authorId = searchParams.get("authorId") || undefined;
		const site = searchParams.get("site") || undefined;

		const offset = (Number(page) - 1) * Number(limit);

		const whereClause = {
			userId: authorId,
			url: site,
		};

		const count = await db.post.count({
			where: whereClause,
		});

		const posts = await db.post.findMany({
			where: whereClause,
			orderBy: {
				[sortBy]: sortOrder,
			},
			skip: offset,
			take: Number(limit),
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

		return NextResponse.json({ postId: newPost.id });
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
