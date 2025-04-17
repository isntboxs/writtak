import { z } from "zod";

export const createPostSchema = z
	.object({
		title: z
			.string()
			.min(3, { message: "Title must be at least 3 characters" }),
		url: z
			.string()
			.trim()
			.url({ message: "URL must be a valid URL" })
			.optional()
			.or(z.literal("")),
		content: z.string().optional(),
	})
	.refine((data) => data.url || data.content, {
		message: "Either URL or content must be provided",
		path: ["content", "url"],
	});

export type CreatePostType = z.infer<typeof createPostSchema>;

export type Post = {
	id: number;
	title: string;
	url: string | null;
	content: string | null;
	points: number;
	createdAt: string;
	commentCount: number;
	author: {
		id: string;
		username: string;
		name: string;
		image: string | null;
		displayUsername: string | null;
	};
	isUpvoted: boolean;
};
