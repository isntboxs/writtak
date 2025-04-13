import { CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CardAuthFooterSkeleton = () => {
	return (
		<CardFooter>
			<div className="flex w-full items-center justify-center gap-1">
				<Skeleton className="h-3.5 w-40 rounded-md" />
				<Skeleton className="h-3.5 w-14 rounded-md" />
			</div>
		</CardFooter>
	);
};

export const SkeletonSignInForm = () => {
	return (
		<div className="grid gap-4">
			{Array.from({ length: 2 }).map((_, i) => (
				<div className="grid gap-2" key={i}>
					<Skeleton className="h-3.5 w-16 rounded-md" />
					<Skeleton className="h-9 w-full rounded-md" />
				</div>
			))}
			<Skeleton className="h-9 w-full rounded-md" />
		</div>
	);
};

export const SkeletonSignUpForm = () => {
	return (
		<div className="grid gap-4">
			{Array.from({ length: 4 }).map((_, i) => (
				<div className="grid gap-2" key={i}>
					<Skeleton className="h-3.5 w-16 rounded-md" />
					<Skeleton className="h-9 w-full rounded-md" />
				</div>
			))}
			<Skeleton className="h-9 w-full rounded-md" />
		</div>
	);
};
