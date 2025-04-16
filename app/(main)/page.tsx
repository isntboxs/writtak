import { Suspense } from "react";

import { PostSection } from "@/app/(main)/_components/post-section";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
	return (
		<div className="mx-auto max-w-3xl rounded-md p-4">
			<h1 className="mb-6 text-2xl font-bold">Submission</h1>

			<Suspense fallback={<SkeletonPostSection />}>
				<PostSection />
			</Suspense>
		</div>
	);
}

const SkeletonPostSection = () => {
	return (
		<>
			<div className="mb-4 flex items-center justify-between">
				<Skeleton className="h-9 w-[180px]" />
				<Skeleton className="size-9" />
			</div>

			<div className="space-y-4">
				{Array.from({ length: 10 }).map((_, index) => (
					<Skeleton key={index} className="h-44 w-full rounded-xl" />
				))}
			</div>
		</>
	);
};
