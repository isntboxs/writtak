"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

type CardWrapperAuthFooterProps = {
	signUp?: boolean;
};

export const CardWrapperAuthFooter = ({
	signUp = false,
}: CardWrapperAuthFooterProps) => {
	const searchParams = useSearchParams();
	const redirectUrl = searchParams.get("redirect_to");

	let encodedRedirectUrl;

	if (redirectUrl) {
		encodedRedirectUrl = encodeURIComponent(redirectUrl);
	}

	if (signUp) {
		return (
			<CardFooter>
				<div className="flex w-full items-center justify-center gap-1">
					<p className="text-muted-foreground text-sm">
						Already have an account?
					</p>
					<Button
						variant="link"
						size="sm"
						className="cursor-pointer p-0"
						asChild
					>
						<Link
							href={
								redirectUrl
									? `/sign-in?redirect_to=${encodedRedirectUrl}`
									: "/sign-in"
							}
						>
							Sign In
						</Link>
					</Button>
				</div>
			</CardFooter>
		);
	}
	return (
		<CardFooter className="flex-col">
			<div className="flex w-full items-center justify-center gap-1">
				<p className="text-muted-foreground text-sm">
					Don&apos;t have an account?
				</p>
				<Button variant="link" size="sm" className="cursor-pointer p-0" asChild>
					<Link
						href={
							redirectUrl
								? `/sign-up?redirect_to=${encodedRedirectUrl}`
								: "/sign-up"
						}
					>
						Sign Up
					</Link>
				</Button>
			</div>
		</CardFooter>
	);
};
