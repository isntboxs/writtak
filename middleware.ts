import { NextRequest, NextResponse } from "next/server";

import { betterFetch } from "@better-fetch/fetch";

import { env } from "@/env";
import { Session } from "@/lib/auth/types";

const authRoutes = ["/sign-in", "/sign-up"];
const protectedRoutes = ["/", "/private", "/submit"];

export async function middleware(request: NextRequest) {
	const { nextUrl } = request;
	const pathName = nextUrl.pathname;

	const isAuthRoute = authRoutes.includes(pathName);
	const isProtectedRoute = protectedRoutes.includes(pathName);

	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: env.NEXT_PUBLIC_APP_URL,
			headers: {
				cookie: request.headers.get("cookie") ?? "", // Forward the cookies from the request
			},
		}
	);

	if (isAuthRoute) {
		if (session) {
			return NextResponse.redirect(new URL("/", nextUrl));
		}
		return NextResponse.next();
	}

	if (!session && isProtectedRoute) {
		let redirectUrl = nextUrl.pathname;

		if (nextUrl.search) {
			redirectUrl += nextUrl.search;
		}

		const encodedRedirectUrl = encodeURIComponent(redirectUrl);

		return Response.redirect(
			new URL(`/sign-in?redirect_to=${encodedRedirectUrl}`, nextUrl)
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
