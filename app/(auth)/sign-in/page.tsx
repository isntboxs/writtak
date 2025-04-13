import { Suspense } from "react";

import { CardWrapperAuth } from "@/app/(auth)/_components/card-wrapper-auth";
import { SignInForm } from "@/app/(auth)/_components/sign-in-form";
import { SignSocialButtons } from "@/app/(auth)/_components/sign-social-buttons";
import { SkeletonSignInForm } from "@/app/(auth)/_components/skeleton";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function SignInPage() {
	return (
		<div className="w-full">
			<CardWrapperAuth>
				<Suspense fallback={<SkeletonSignInForm />}>
					<SignInForm />
				</Suspense>
				<div className="mt-6 space-y-4">
					<div className="flex items-center justify-center gap-2">
						<Separator className="flex-1" />
						<p className="text-muted-foreground text-sm">or</p>
						<Separator className="flex-1" />
					</div>
					<Suspense fallback={<Skeleton className="h-9 w-full rounded-md" />}>
						<SignSocialButtons />
					</Suspense>
				</div>
			</CardWrapperAuth>
		</div>
	);
}
