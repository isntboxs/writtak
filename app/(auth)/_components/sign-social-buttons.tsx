"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth/client";

export const SignSocialButtons = () => {
	const [loading, setLoading] = useState<boolean>(false);

	const searchParams = useSearchParams();
	const redirectUrl = searchParams.get("redirect_to");

	const onSignInSocial = async () => {
		await signIn.social({
			provider: "github",
			callbackURL: redirectUrl ? redirectUrl : "/",
			errorCallbackURL: "/sign-in",
			fetchOptions: {
				onRequest: () => {
					setLoading(true);
				},
				onSuccess: () => {
					setLoading(false);
				},
				onError: (ctx) => {
					console.log(ctx);
					setLoading(false);
				},
			},
		});
	};

	return (
		<div className="w-full">
			<Button
				className="w-full cursor-pointer"
				onClick={onSignInSocial}
				disabled={loading}
			>
				{loading ? (
					<>
						<Loader2 className="animate-spin" />
						Continue with GitHub
					</>
				) : (
					<>
						<FaGithub />
						Continue with GitHub
					</>
				)}
			</Button>
		</div>
	);
};
