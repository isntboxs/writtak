import { BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import {
	admin,
	anonymous,
	bearer,
	customSession,
	multiSession,
	oAuthProxy,
	openAPI,
	organization,
	username,
} from "better-auth/plugins";

import { APP_NAME } from "@/constants";
import { env } from "@/env";
import { PrismaClient } from "@/prisma/generated/prisma/client";

const prisma = new PrismaClient();

export const authConfig = {
	appName: APP_NAME,
	baseURL: env.NEXT_PUBLIC_APP_URL,
	trustedOrigins: [env.NEXT_PUBLIC_APP_URL],
	logger: {
		disabled: process.env.NODE_ENV === "production",
		level: "debug",
	},
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	session: {
		freshAge: 0,
		expiresIn: 60 * 60 * 24 * 3, // 3 days
		updateAge: 60 * 60 * 12, // 12 hours (every 12 hours the session expiration is updated)
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5, // 5 minutes
		},
	},
	user: {
		changeEmail: {
			enabled: true,
		},
		deleteUser: {
			enabled: true,
		},
	},
	emailAndPassword: {
		enabled: true,
	},
	account: {
		accountLinking: {
			trustedProviders: ["github"],
		},
	},
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		},
	},
	plugins: [
		anonymous(),
		bearer(),
		customSession(async (session) => {
			return {
				...session,
				user: {
					...session.user,
					// dd: "test",
				},
			};
		}),
		multiSession(),
		nextCookies(),
		oAuthProxy(),
		openAPI(),
		organization(),
		username(),
		admin(),
	],
} satisfies BetterAuthOptions;
