import type { Metadata } from "next";

import "@/styles/globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { APP_NAME } from "@/constants";
import { geistMono, geistSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: {
		template: `%s | ${APP_NAME}`,
		default: APP_NAME,
	},
	description: "A simple platform created by @mrboxs.",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: dark)",
				url: "https://j85ducwzne.ufs.sh/f/3tEolv156eYjnjPhoMt3agoYM2VHKlrbieBQPO3F6XWLGRzu",
				href: "https://j85ducwzne.ufs.sh/f/3tEolv156eYjnjPhoMt3agoYM2VHKlrbieBQPO3F6XWLGRzu",
			},
			{
				media: "(prefers-color-scheme: light)",
				url: "https://j85ducwzne.ufs.sh/f/3tEolv156eYjnjPhoMt3agoYM2VHKlrbieBQPO3F6XWLGRzu",
				href: "https://j85ducwzne.ufs.sh/f/3tEolv156eYjnjPhoMt3agoYM2VHKlrbieBQPO3F6XWLGRzu",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"font-sans antialiased",
					geistSans.variable,
					geistMono.variable
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
