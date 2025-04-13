import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CardWrapperAuthHeaderProps = {
	signUp?: boolean;
};

export const CardWrapperAuthHeader = ({
	signUp = false,
}: CardWrapperAuthHeaderProps) => {
	if (signUp) {
		return (
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">Sign Up</CardTitle>
				<CardDescription>
					Create an account to continue using{" "}
					<span className="font-bold underline underline-offset-2">
						writtak
					</span>
					.
				</CardDescription>
			</CardHeader>
		);
	}

	return (
		<CardHeader className="text-center">
			<CardTitle className="text-2xl">Sign In</CardTitle>
			<CardDescription>
				Continue using{" "}
				<span className="font-bold underline underline-offset-2">writtak</span>{" "}
				with your account.
			</CardDescription>
		</CardHeader>
	);
};
