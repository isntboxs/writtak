import { Suspense } from "react";

import { CardWrapperAuth } from "@/app/(auth)/_components/card-wrapper-auth";
import { SignSocialButtons } from "@/app/(auth)/_components/sign-social-buttons";
import { SignUpForm } from "@/app/(auth)/_components/sign-up-form";
import { SkeletonSignUpForm } from "@/app/(auth)/_components/skeleton";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function SignUpPage() {
	return (
		<div className="w-full">
			<CardWrapperAuth signUp>
				<Suspense fallback={<SkeletonSignUpForm />}>
					<SignUpForm />
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
