import { z } from "zod";

export const sortBySchema = z.enum(["points", "recent"]);
export const sortOrderSchema = z.enum(["asc", "desc"]);

export const paginationSchema = z.object({
	limit: z.number({ coerce: true }).optional().default(10),
	page: z.number({ coerce: true }).optional().default(1),
	sortBy: sortBySchema.optional().default("points"),
	sortOrder: sortOrderSchema.optional().default("desc"),
	author: z.string().optional(),
	site: z.string().optional(),
});

export type PaginationType = z.infer<typeof paginationSchema>;
export type SortByType = z.infer<typeof sortBySchema>;
export type SortOrderType = z.infer<typeof sortOrderSchema>;
