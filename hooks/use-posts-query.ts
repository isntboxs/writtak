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
	page?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	author?: string;
	site?: string;
};

export const usePostsQuery = (params: PostsQueryParams = {}) => {
	const {
		limit = 10,
		sortBy = "points",
		sortOrder = "desc",
		author,
		site,
	} = params;

	const { data } = useInfiniteQuery({
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
				console.log(`Making request to: /api/posts?${searchParams.toString()}`);
				const response = await axios.get<PostsResponse>(
					`/api/posts?${searchParams.toString()}`,
					{
						withCredentials: true, // Add this to ensure cookies are sent
					}
				);
				return response.data;
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error("API Error:", error.message);
					if (error.response) {
						console.error("Response data:", error.response.data);
						console.error("Response status:", error.response.status);
						throw new Error(
							error.response.data.error ||
								`Server error: ${error.response.status}`
						);
					} else if (error.request) {
						console.error("No response received:", error.request);
						throw new Error("No response received from server");
					}
				}
				console.error("Unexpected error:", error);
				throw new Error("Failed to fetch posts", { cause: error });
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

	return {
		data,
	};
};
