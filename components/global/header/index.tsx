import Link from "next/link";

import { DesktopNavHeader } from "@/components/global/header/desktop-nav-header";
import { MobileNavHeader } from "@/components/global/header/mobile-nav-header";

export const SiteHeader = () => {
	return (
		<header className="border-border bg-background/60 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-14 w-full border-b border-dashed backdrop-blur">
			<div className="container flex h-full items-center justify-between p-4">
				<Link href="/" className="text-2xl font-bold">
					writtak
				</Link>

				<DesktopNavHeader />

				<MobileNavHeader />
			</div>
		</header>
	);
};
