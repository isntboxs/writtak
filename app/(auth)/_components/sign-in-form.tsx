"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signInSchema, SignInSchemaType } from "@/app/(auth)/_scemas";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth/client";

export const SignInForm = () => {
	const [loading, setLoading] = useState<boolean>(false);

	const searchParams = useSearchParams();
	const redirectUrl = searchParams.get("redirect_to");

	const router = useRouter();

	const form = useForm<SignInSchemaType>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			username: "",
			password: "",
		},
		mode: "all",
		reValidateMode: "onChange",
	});

	const onSubmitSignIn = async (data: SignInSchemaType) => {
		await signIn.username({
			username: data.username,
			password: data.password,
			fetchOptions: {
				onRequest: () => {
					setLoading(true);
				},
				onSuccess: () => {
					setLoading(false);
					form.reset();
					router.push(redirectUrl ? redirectUrl : "/");
				},
				onError: (ctx) => {
					console.log(ctx);
					setLoading(false);
				},
			},
		});
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit(onSubmitSignIn)(e);
					}}
					className="grid gap-4"
				>
					<div className="grid gap-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder="yourusername"
											type="text"
											disabled={loading || form.formState.isSubmitting}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder="********"
											type="password"
											disabled={loading || form.formState.isSubmitting}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						type="submit"
						className="cursor-pointer"
						disabled={
							loading || form.formState.isSubmitting || !form.formState.isValid
						}
					>
						{loading || form.formState.isSubmitting
							? "Signing In..."
							: "Sign In"}
					</Button>
				</form>
			</Form>
		</>
	);
};
