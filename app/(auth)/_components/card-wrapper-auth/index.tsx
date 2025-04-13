import { Suspense } from "react";

import { CardWrapperAuthFooter } from "@/app/(auth)/_components/card-wrapper-auth/footer";
import { CardWrapperAuthHeader } from "@/app/(auth)/_components/card-wrapper-auth/header";
import { CardAuthFooterSkeleton } from "@/app/(auth)/_components/skeleton";
import { Card, CardContent } from "@/components/ui/card";

type CardWrapperAuthProps = {
	signUp?: boolean;
	children: React.ReactNode;
};

export const CardWrapperAuth = ({ children, signUp }: CardWrapperAuthProps) => {
	return (
		<Card className="mx-auto mt-12 max-w-md">
			<CardWrapperAuthHeader signUp={signUp} />
			<CardContent>{children}</CardContent>
			<Suspense fallback={<CardAuthFooterSkeleton />}>
				<CardWrapperAuthFooter signUp={signUp} />
			</Suspense>
		</Card>
	);
};
