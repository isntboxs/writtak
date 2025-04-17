"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { CHANNELS, EVENTS, pusherClient } from "@/lib/pusher";
import { Post } from "@/types/post-type";

type PusherContextType = {
	isConnected: boolean;
};

const PusherContext = createContext<PusherContextType | null>(null);

export const usePusher = () => {
	const context = useContext(PusherContext);
	if (!context) {
		throw new Error("usePusher must be used within a PusherProvider");
	}
	return context;
};

export function PusherProvider({ children }: { children: React.ReactNode }) {
	const [isConnected, setIsConnected] = useState(false);
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!pusherClient) return;

		// Connect to Pusher
		pusherClient.connect();
		setIsConnected(true);

		// Subscribe to the posts channel
		const channel = pusherClient.subscribe(CHANNELS.POSTS);

		// Listen for new posts
		channel.bind(EVENTS.NEW_POST, (newPost: Post) => {
			// Update the React Query cache with the new post
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.info("New post added", { description: newPost.title });
		});

		// Listen for upvotes
		channel.bind(EVENTS.UPVOTE, () => {
			// Update the React Query cache with the updated post
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Upvote added", { description: "Upvote added" });
		});

		// Cleanup on unmount
		return () => {
			channel.unbind_all();
			pusherClient?.unsubscribe(CHANNELS.POSTS);
			pusherClient?.disconnect();
			setIsConnected(false);
		};
	}, [queryClient]);

	return (
		<PusherContext.Provider value={{ isConnected }}>
			{children}
		</PusherContext.Provider>
	);
}
