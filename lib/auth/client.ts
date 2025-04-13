import {
	adminClient,
	anonymousClient,
	genericOAuthClient,
	multiSessionClient,
	oidcClient,
	organizationClient,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "@/env";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_APP_URL,
	plugins: [
		anonymousClient(),
		multiSessionClient(),
		oidcClient(),
		genericOAuthClient(),
		usernameClient(),
		organizationClient(),
		adminClient(),
	],
});

export const {
	signUp,
	signIn,
	signOut,
	useSession,
	organization,
	useListOrganizations,
	useActiveOrganization,
} = authClient;
