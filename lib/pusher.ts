import Pusher from "pusher";
import PusherClient from "pusher-js";

import { env } from "@/env";

// Pusher channels and events
export const CHANNELS = {
	POSTS: "posts",
};

export const EVENTS = {
	NEW_POST: "new-post",
	UPVOTE: "upvote",
};

// Server-side Pusher instance
export const pusherServer = new Pusher({
	appId: env.NEXT_PUBLIC_PUSHER_APP_ID,
	key: env.NEXT_PUBLIC_PUSHER_KEY,
	secret: env.NEXT_PUBLIC_PUSHER_SECRET,
	cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
	useTLS: true,
});

// Client-side Pusher instance
let pusherClient: PusherClient | undefined;

if (typeof window !== "undefined") {
	pusherClient = new PusherClient(env.NEXT_PUBLIC_PUSHER_KEY, {
		cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
	});
}

export { pusherClient };
