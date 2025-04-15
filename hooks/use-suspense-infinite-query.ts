"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { Post } from "@/types/post-type";

type PostsResponse = {
	data: Post[];
	pagination: {
		page: number;
		totalPages: number;
	};
};

type PostsQueryParams = {
	limit?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	author?: string;
	site?: string;
};

/**
 * Custom hook for fetching posts with infinite scrolling using React Query's suspense mode
 *
 * @param params Query parameters for filtering and sorting posts
 * @returns Infinite query result with posts data
 */
export function useSuspenseInfiniteQuery(params: PostsQueryParams = {}) {
	const {
		limit = 10,
		sortBy = "points",
		sortOrder = "desc",
		author,
		site,
	} = params;

	return useInfiniteQuery({
		queryKey: ["posts", { limit, sortBy, sortOrder, author, site }],
		queryFn: async ({ pageParam = 1 }) => {
			const searchParams = new URLSearchParams();
			searchParams.set("page", String(pageParam));
			searchParams.set("limit", String(limit));
			searchParams.set("sortBy", sortBy);
			searchParams.set("sortOrder", sortOrder);

			if (author) searchParams.set("author", author);
			if (site) searchParams.set("site", site);

			try {
				const response = await axios.get<PostsResponse>(
					`/api/posts?${searchParams.toString()}`
				);
				return response.data;
			} catch (error) {
				if (axios.isAxiosError(error) && error.response) {
					throw new Error(error.response.data.error || "Failed to fetch posts");
				}
				throw new Error("Failed to fetch posts");
			}
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.pagination.totalPages <= lastPageParam) {
				return undefined;
			}
			return lastPageParam + 1;
		},
	});
}
