import { NuqsAdapter } from "nuqs/adapters/next/app";

import { SiteHeader } from "@/components/global/header";
import { PusherProvider } from "@/components/providers/pusher-provider";
import { QueryAppProvider } from "@/components/providers/query-app-provider";

export const AppWrapperProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className="flex min-h-screen flex-col">
			<SiteHeader />
			<main className="container grow p-4">
				<NuqsAdapter>
					<QueryAppProvider>
						<PusherProvider>{children}</PusherProvider>
					</QueryAppProvider>
				</NuqsAdapter>
			</main>
		</div>
	);
};
