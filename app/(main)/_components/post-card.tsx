"use client";

import { usePostsQuery } from "@/hooks/use-posts-query";

export const PostCard = () => {
	const { data } = usePostsQuery();

	return (
		<div>
			PostCard
			{JSON.stringify(data)}
		</div>
	);
};
