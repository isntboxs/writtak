import Link from "next/link";

import { formatDistanceToNow } from "date-fns";
import { ChevronUpIcon, ExternalLink, MessageSquare } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Post } from "@/types/post-type";

export const PostCard = ({
	post,
	site,
	setSite,
	author,
	setAuthor,
	onUpvote,
}: {
	post: Post;
	site: string;
	setSite: (site: string) => void;
	author: string;
	setAuthor: (author: string) => void;
	onUpvote?: (id: number) => void;
}) => {
	return (
		<Card className="overflow-hidden py-0">
			<div className="flex flex-row">
				{/* voting section */}
				<div
					className={cn(
						"flex flex-col items-center justify-center px-2 py-4",
						"bg-muted border-r"
					)}
				>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									onClick={() => onUpvote?.(post.id)}
									variant={post.isUpvoted ? "default" : "outline"}
									size="icon"
									className={cn(
										"size-8 cursor-pointer rounded-full transition-all duration-500"
									)}
									aria-label="upvote"
								>
									<ChevronUpIcon className="h-5 w-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Upvote</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<Badge
						variant="outline"
						className={cn("mx-0 my-2 px-2 py-0.5 font-medium")}
					>
						{post.points}
					</Badge>
				</div>

				{/* content section */}
				<div className="flex-1">
					<CardHeader className="p-3 pb-0 sm:p-4 sm:pb-0">
						<div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-2">
							<h2 className="text-base leading-tight font-semibold sm:text-lg">
								<Link
									href={`/post/${post.id}`}
									className="hover:text-muted-foreground transition-colors"
								>
									{post.title}
								</Link>
							</h2>

							{post.url ? (
								<span
									onClick={() => setSite(post.url ?? site)}
									className={cn(
										badgeVariants({ variant: "secondary" }),
										"line-clamp-1 flex cursor-pointer items-center text-xs font-normal hover:underline hover:underline-offset-2"
									)}
								>
									{new URL(post.url).hostname.replace("www.", "")}
									<ExternalLink className="ml-1 h-3 w-3" />
								</span>
							) : null}
						</div>
					</CardHeader>

					{post.content && (
						<CardContent className="p-3 pt-2 sm:p-4">
							<p className="text-muted-foreground line-clamp-2 text-sm">
								{post.content}
							</p>
						</CardContent>
					)}

					<CardFooter className="text-muted-foreground flex flex-wrap items-center gap-y-1 p-3 pt-0 text-xs sm:p-4">
						<div className="flex items-center">
							<Avatar className="mr-1.5 h-5 w-5">
								{/* {post.author.avatar && (
									<AvatarImage
										src={post.author.avatar || "/placeholder.svg"}
										alt={post.author.username}
									/>
								)} */}
								<AvatarFallback className="text-[10px] uppercase">
									{post.author.username.slice(0, 2)}
								</AvatarFallback>
							</Avatar>
							<span
								className="hover:text-primary cursor-pointer transition-all duration-500"
								onClick={() => setAuthor(post.author.id ?? author)}
							>
								{post.author.username}
							</span>
						</div>

						<div className="bg-border mx-2 h-5 w-px" />

						<time dateTime={post.createdAt}>
							{formatDistanceToNow(post.createdAt, { addSuffix: true })}
						</time>

						<div className="bg-border mx-2 h-5 w-px" />

						<Link
							href={`/post/${post.id}`}
							className="hover:text-primary flex items-center transition-colors"
						>
							<MessageSquare className="mr-1 h-3.5 w-3.5" />
							{post.commentCount}{" "}
							{post.commentCount === 1 ? "comment" : "comments"}
						</Link>
					</CardFooter>
				</div>
			</div>
		</Card>
	);
};
