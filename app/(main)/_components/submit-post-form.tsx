"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitPost } from "@/hooks/posts-hooks";
import { createPostSchema, CreatePostType } from "@/types/post-type";

export const SubmitPostForm = () => {
	const router = useRouter();

	const form = useForm<CreatePostType>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			title: "",
			url: "",
			content: "",
		},
		mode: "all",
		reValidateMode: "onChange",
	});

	const submitMutation = useSubmitPost();

	const onSubmit = async (data: CreatePostType) => {
		submitMutation.mutate(
			{ title: data.title, url: data.url, content: data.content },
			{
				onSuccess: (data) => {
					router.push(`/post/${data.postId}`);
				},
				onError: (error) => {
					console.log(error);
					toast.error("Failed to submit post", {
						description:
							error instanceof Error ? error.message : "Unknown error",
					});
				},
			}
		);
	};
	return (
		<Card className="mx-auto mt-12 max-w-md">
			<CardHeader>
				<CardTitle>Create New Post</CardTitle>
				<CardDescription>
					Leave url blank to submit a question for discussion. If there is no
					url, text will appear at the top of the thread. If there is a url,
					text is optional.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit(onSubmit)(e);
						}}
						className="grid gap-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											placeholder="Title of the post"
											type="text"
											disabled={form.formState.isSubmitting}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Url</FormLabel>
									<FormControl>
										<Input
											placeholder="Url of the post"
											type="url"
											disabled={form.formState.isSubmitting}
											{...field}
										/>
									</FormControl>
									<FormMessage>
										{form.formState.errors.url?.message ||
											form.formState.errors.content?.message}
									</FormMessage>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Content</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Content of the post"
											disabled={form.formState.isSubmitting}
											{...field}
										/>
									</FormControl>
									<FormMessage>
										{form.formState.errors.content?.message ||
											form.formState.errors.url?.message}
									</FormMessage>
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="cursor-pointer"
							disabled={form.formState.isSubmitting || !form.formState.isValid}
						>
							{form.formState.isSubmitting ? (
								<>
									<Loader2 className="repeat-infinite animate-spin" />{" "}
									Submiting...
								</>
							) : (
								"Submit"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
