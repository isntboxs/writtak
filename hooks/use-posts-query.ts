import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useQueryState } from "nuqs";

import { Post } from "@/types/post-type";

type PostsResponse = {
	data: Post[];
	pagination: {
		page: number;
		totalPages: number;
	};
};

type Pagination = {
	sortBy?: string;
	sortOrder?: string;
	author?: string;
	site?: string;
};

const getPostsAxios = async ({
	pageParam = 1,
	pagination,
}: {
	pageParam: number;
	pagination: Pagination;
}) => {
	try {
		const response = await axios.get<PostsResponse>(`/api/posts`, {
			params: {
				page: pageParam,
				sortBy: pagination.sortBy,
				sortOrder: pagination.sortOrder,
				author: pagination.author,
				site: pagination.site,
			},
		});

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error || "Failed to fetch posts");
		}
		throw new Error("Failed to fetch posts");
	}
};

const postsInfiniteQueryOptions = ({
	sortBy = "points",
	sortOrder = "desc",
	author = "",
	site = "",
}: {
	sortBy?: string;
	sortOrder?: string;
	author?: string;
	site?: string;
}) =>
	infiniteQueryOptions({
		queryKey: ["posts", sortBy, sortOrder, author, site],
		queryFn: ({ pageParam }) =>
			getPostsAxios({
				pageParam,
				pagination: {
					sortBy,
					sortOrder,
					author,
					site,
				},
			}),
		initialPageParam: 1,
		staleTime: Infinity,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.pagination.totalPages <= lastPageParam) {
				return undefined;
			}
			return lastPageParam + 1;
		},
	});

export const usePostsQuery = () => {
	const [sortBy, setSortBy] = useQueryState("sortBy", {
		defaultValue: "recent",
	});
	const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
		defaultValue: "desc",
	});
	const [author, setAuthor] = useQueryState("author", { defaultValue: "" });
	const [site, setSite] = useQueryState("site", { defaultValue: "" });

	const {
		data,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
		isPending,
		isLoading,
	} = useInfiniteQuery(
		postsInfiniteQueryOptions({
			sortBy,
			sortOrder,
			author,
			site,
		})
	);

	return {
		data,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
		isPending,
		isLoading,
		sortBy,
		setSortBy,
		sortOrder,
		setSortOrder,
		author,
		setAuthor,
		site,
		setSite,
	};
};
