"use client";

import { SortBarPosts } from "@/app/(main)/_components/sort-bar-posts";
import { usePostsQuery } from "@/hooks/use-posts-query";

export const PostSection = () => {
	const { data, sortBy, setSortBy, sortOrder, setSortOrder } = usePostsQuery();

	return (
		<div>
			<SortBarPosts
				sortBy={sortBy}
				setSortBy={setSortBy}
				orderBy={sortOrder}
				setOrderBy={setSortOrder}
			/>
			{JSON.stringify(data)}
		</div>
	);
};
