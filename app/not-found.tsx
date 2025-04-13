import Link from "next/link";

import { HomeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
	return (
		<div className="mt-12 flex size-full items-center justify-center p-2">
			<div className="flex flex-col items-center gap-4">
				<h1 className="text-4xl font-bold">404</h1>
				<p className="text-muted-foreground text-center text-lg">
					Page not found
				</p>
				<Button asChild>
					<Link href="/">
						<HomeIcon />
						Go back home
					</Link>
				</Button>
			</div>
		</div>
	);
}
