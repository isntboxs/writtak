import type { Metadata } from "next/types";

import { APP_NAME } from "@/constants";
import { env } from "@/env";

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		openGraph: {
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			url: env.NEXT_PUBLIC_APP_URL,
			images:
				"https://j85ducwzne.ufs.sh/f/3tEolv156eYjnjPhoMt3agoYM2VHKlrbieBQPO3F6XWLGRzu",
			siteName: APP_NAME,
			...override.openGraph,
		},
		twitter: {
			card: "summary_large_image",
			creator: "@mrboxs",
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			images:
				"https://j85ducwzne.ufs.sh/f/3tEolv156eYjnjPhoMt3agoYM2VHKlrbieBQPO3F6XWLGRzu",
			...override.twitter,
		},
		metadataBase: override.metadataBase ?? new URL(env.NEXT_PUBLIC_APP_URL),
	};
}
