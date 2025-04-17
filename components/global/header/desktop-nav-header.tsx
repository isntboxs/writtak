"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ThemeToggleMode } from "@/components/global/theme-toggle-mode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "@/lib/auth/client";
import { Session } from "@/lib/auth/types";

export const DesktopNavHeader = () => {
	const { data: session, isPending } = useSession();

	return (
		<div className="hidden items-center space-x-4 md:flex">
			<nav className="flex items-center space-x-2">
				<Button variant="ghost" size="sm" className="cursor-pointer" asChild>
					<Link href="#">new</Link>
				</Button>
				<Button variant="ghost" size="sm" className="cursor-pointer" asChild>
					<Link href="#">top</Link>
				</Button>
				<Button variant="ghost" size="sm" className="cursor-pointer" asChild>
					<Link href="/submit">submit</Link>
				</Button>
			</nav>

			<div className="bg-border h-6 w-px" />

			{isPending ? (
				<Skeleton className="size-8 rounded-full" />
			) : !session ? (
				<>
					<Button size="sm" className="cursor-pointer" asChild>
						<Link href="/sign-in">sign in</Link>
					</Button>
				</>
			) : (
				<UserButton data={JSON.parse(JSON.stringify(session))} />
			)}
			<ThemeToggleMode />
		</div>
	);
};

const UserButton = ({ data }: { data: Session }) => {
	const router = useRouter();

	const onSignOut = async () => {
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/sign-in");
					router.refresh();
				},
			},
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="size-8 cursor-pointer rounded-full"
				>
					<Avatar>
						{data.user.image ? (
							<>
								<AvatarImage
									src={data.user.image}
									alt={data.user.username ?? data.user.name}
								/>
								<AvatarFallback>
									{data.user.username?.charAt(0) ?? data.user.name.charAt(0)}
								</AvatarFallback>
							</>
						) : (
							<AvatarFallback>
								{data.user.username?.charAt(0) ?? data.user.name.charAt(0)}
							</AvatarFallback>
						)}
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="m-1 w-56" align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Keyboard shortcuts
						<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>Team</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Email</DropdownMenuItem>
								<DropdownMenuItem>Message</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>More...</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuItem>
						New Team
						<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>GitHub</DropdownMenuItem>
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuItem disabled>API</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onSignOut}>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
