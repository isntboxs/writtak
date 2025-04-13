import { SiteHeader } from "@/components/global/header";
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
				<QueryAppProvider>{children}</QueryAppProvider>
			</main>
		</div>
	);
};
