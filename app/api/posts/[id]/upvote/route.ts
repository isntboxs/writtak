import { NextRequest, NextResponse } from "next/server";

import { getSessionAction } from "@/actions/get-session-action";
import { db } from "@/db";
import { CHANNELS, EVENTS, pusherServer } from "@/lib/pusher";

export interface Context {
	params: Promise<{ id: string }>;
}

export const POST = async (req: NextRequest, ctx: Context) => {
	try {
		const { id } = await ctx.params;
		const postId = Number(id);

		if (isNaN(postId)) {
			return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
		}

		const session = await getSessionAction();

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		let pointsChange: -1 | 1 = 1;

		const post = await db.post.findUnique({
			where: { id: postId },
			select: { id: true },
		});

		if (!post) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		const points = await db.$transaction(async (tx) => {
			const existingUpvote = await tx.postUpvote.findUnique({
				where: { userId_postId: { userId: session.user.id, postId } },
				select: { id: true },
			});

			pointsChange = existingUpvote ? -1 : 1;

			const updatePost = await tx.post.update({
				where: { id: postId },
				data: { points: { increment: pointsChange } },
				select: { points: true },
			});

			if (existingUpvote) {
				await tx.postUpvote.delete({
					where: { userId_postId: { userId: session.user.id, postId } },
				});
			} else {
				await tx.postUpvote.create({
					data: { userId: session.user.id, postId },
				});
			}

			return updatePost.points;
		});

		// Import pusherServer at the top of the file
		// const { pusherServer, CHANNELS, EVENTS } = await import("@/lib/pusher");

		// Trigger a Pusher event for the upvote
		await pusherServer.trigger(CHANNELS.POSTS, EVENTS.UPVOTE, {
			postId,
			points,
			isUpvoted: pointsChange > 0,
		});

		return NextResponse.json({
			data: {
				count: points,
				isUpvoted: pointsChange > 0,
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
