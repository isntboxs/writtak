"use client";

import { ArrowRight, Loader2 } from "lucide-react";

import { PostCard } from "@/app/(main)/_components/post-card";
import { SortBarPosts } from "@/app/(main)/_components/sort-bar-posts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpvotePost } from "@/hooks/posts-hooks";
import { usePostsQuery } from "@/hooks/use-posts-query";

export const PostSection = () => {
	const {
		data,
		isLoading,
		isPending,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
		sortBy,
		setSortBy,
		sortOrder,
		setSortOrder,
		site,
		setSite,
		author,
		setAuthor,
	} = usePostsQuery();

	const upVoteMutation = useUpvotePost();

	return (
		<>
			<SortBarPosts
				sortBy={sortBy}
				setSortBy={setSortBy}
				orderBy={sortOrder}
				setOrderBy={setSortOrder}
			/>

			{isLoading || isPending || isFetchingNextPage ? (
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
								onUpvote={() => upVoteMutation.mutate(post.id.toString())}
							/>
						))
					)}
				</div>
			)}

			<div className="mt-4">
				<Button
					onClick={() => fetchNextPage()}
					disabled={
						!hasNextPage || isLoading || isPending || isFetchingNextPage
					}
				>
					{isLoading || isPending || isFetchingNextPage ? (
						<>
							<Loader2 className="repeat-infinite animate-spin" /> Loading ...
						</>
					) : hasNextPage ? (
						<>
							<ArrowRight className="size-4" /> Load More
						</>
					) : (
						"No more posts"
					)}
				</Button>
			</div>
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
