import {
	InfiniteData,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { current, produce } from "immer";
import { toast } from "sonner";

import { Post } from "@/types/post-type";

type PostUpvoteResponse = {
	data: {
		count: number;
		isUpvoted: boolean;
	};
};

type PostsResponse = {
	data: Post[];
	pagination: {
		page: number;
		totalPages: number;
	};
};

type PostSubmitResponse = {
	data: {
		postId: number;
	};
};

const updatePostUpvote = (draf: Post) => {
	draf.points += draf.isUpvoted ? -1 : +1;
	draf.isUpvoted = !draf.isUpvoted;
};

const postUpvoteAxios = async (postId: string) => {
	const { data } = await axios.post<PostUpvoteResponse>(
		`/api/posts/${postId}/upvote`
	);
	return data;
};

export const postSubmitAxios = async (
	title: string,
	url?: string,
	content?: string
) => {
	try {
		const res = await axios.post<PostSubmitResponse>(`/api/posts`, {
			title,
			url,
			content,
		});

		return res;
	} catch (error) {
		console.error(error);
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error || "Failed to fetch posts");
		}
		throw new Error("Failed to fetch posts");
	}
};

export const useUpvotePost = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: postUpvoteAxios,
		onMutate: async (variable) => {
			let previousData;
			await queryClient.cancelQueries({ queryKey: ["post", Number(variable)] });
			queryClient.setQueriesData<InfiniteData<PostsResponse>>(
				{ queryKey: ["posts"], type: "active" },
				produce((oldData) => {
					previousData = current(oldData);
					if (!oldData) return undefined;
					oldData.pages.forEach((page) => {
						page.data.forEach((post) => {
							if (post.id.toString() === variable) {
								updatePostUpvote(post);
							}
						});
					});
				})
			);

			return { previousData };
		},
		onSuccess(upvoteData, variable) {
			queryClient.setQueriesData<InfiniteData<PostsResponse>>(
				{ queryKey: ["posts"] },
				produce((oldData) => {
					if (!oldData) return undefined;
					oldData.pages.forEach((page) => {
						page.data.forEach((post) => {
							if (post.id.toString() === variable) {
								post.points = upvoteData.data.count;
								post.isUpvoted = upvoteData.data.isUpvoted;
							}
						});
					});
				})
			);
			queryClient.invalidateQueries({
				queryKey: ["posts"],
				type: "inactive",
				refetchType: "none",
			});
		},
		onError(error, variable, context) {
			console.error(error);
			toast.error("Failed to upvote post");
			if (context?.previousData) {
				queryClient.setQueriesData(
					{ queryKey: ["posts"], type: "active" },
					context.previousData
				);
				queryClient.invalidateQueries({ queryKey: ["posts"] });
			}
		},
	});

	return mutation;
};
