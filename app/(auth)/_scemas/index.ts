import { z } from "zod";

export const signInSchema = z
	.object({
		username: z
			.string()
			.trim()
			.min(3, { message: "Username must be at least 3 characters" })
			.max(50, { message: "Username must be at most 50 characters" })
			.regex(/^[a-zA-Z0-9]+$/, { message: "Username must be alphanumeric" }),
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters" }),
	})
	.refine((data) => data.username || data.password, {
		message: "Either username or password must be provided",
		path: ["username", "password"],
	});

export type SignInSchemaType = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name must be at least 3 characters" })
		.max(100, { message: "Name must be at most 100 characters" }),
	username: z
		.string()
		.trim()
		.min(3, { message: "Username must be at least 3 characters" })
		.max(50, { message: "Username must be at most 50 characters" })
		.regex(/^[a-zA-Z0-9]+$/, { message: "Username must be alphanumeric" }),
	email: z.string().email({ message: "Email must be a valid email address" }),
	password: z.string().min(6),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
