import { ArrowUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const SortBarPosts = ({
	sortBy,
	setSortBy,
	orderBy,
	setOrderBy,
}: {
	sortBy: string;
	setSortBy: (sortBy: string) => void;
	orderBy: string;
	setOrderBy: (orderBy: string) => void;
}) => {
	return (
		<div className="mb-4 flex items-center justify-between">
			<Select value={sortBy} onValueChange={setSortBy}>
				<SelectTrigger className="w-[180px] cursor-pointer">
					<SelectValue placeholder="Select sort by" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Sort By</SelectLabel>
						<SelectItem value="points" className="cursor-pointer">
							Points
						</SelectItem>
						<SelectItem value="recent" className="cursor-pointer">
							Recent
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			<Button
				variant="outline"
				size="icon"
				className="cursor-pointer"
				onClick={() => setOrderBy(orderBy === "asc" ? "desc" : "asc")}
				aria-label={orderBy === "asc" ? "Sort descending" : "Sort ascending"}
			>
				<ArrowUpIcon
					className={cn(
						"size-4 transition-all duration-500",
						orderBy === "asc" && "rotate-180"
					)}
				/>
			</Button>
		</div>
	);
};
