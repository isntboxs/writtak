export const AppWrapperProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className="flex min-h-screen flex-col">
			<main className="container grow p-4">{children}</main>
		</div>
	);
};
