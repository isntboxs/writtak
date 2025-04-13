import { SiteHeader } from "@/components/global/header";

export const AppWrapperProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className="flex min-h-screen flex-col">
			<SiteHeader />
			<main className="container grow p-4">{children}</main>
		</div>
	);
};
