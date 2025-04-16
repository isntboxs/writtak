"use client";

import { PostCard } from "@/app/(main)/_components/post-card";
import { SortBarPosts } from "@/app/(main)/_components/sort-bar-posts";
import { Skeleton } from "@/components/ui/skeleton";
import { usePostsQuery } from "@/hooks/use-posts-query";

export const PostSection = () => {
	const {
		data,
		isLoading,
		isPending,
		sortBy,
		setSortBy,
		sortOrder,
		setSortOrder,
		site,
		setSite,
		author,
		setAuthor,
	} = usePostsQuery();

	return (
		<>
			<SortBarPosts
				sortBy={sortBy}
				setSortBy={setSortBy}
				orderBy={sortOrder}
				setOrderBy={setSortOrder}
			/>

			{isLoading || isPending ? (
				<SkeletonPostCard />
			) : (
				<div className="space-y-4">
					{data?.pages.map((page) =>
						page.data.map((post) => (
							<PostCard
								key={post.id}
								post={post}
								setSite={setSite}
								site={site}
								author={author}
								setAuthor={setAuthor}
							/>
						))
					)}
				</div>
			)}
		</>
	);
};

export const SkeletonPostCard = () => {
	return (
		<div className="space-y-4">
			{Array.from({ length: 10 }).map((_, index) => (
				<Skeleton key={index} className="h-44 w-full rounded-xl" />
			))}
		</div>
	);
};
