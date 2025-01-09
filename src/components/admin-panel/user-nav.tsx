"use client";

import Link from "next/link";
import { CircleUser, LayoutGrid, LogOut, User } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import ChangeProfile from "./changeProfile";
import UserLogout from "./user-logout";
import { User as typeOfUser } from "@/types";
import { useSession } from "next-auth/react";
export function UserNav({ user }: { user: typeOfUser | null }) {
  const session = useSession();
  const token = session.data?.token || "";
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border">
                {user?.profile_image ? (
                  <Image
                    src={getImageUrl(user?.profile_image)}
                    width={0}
                    height={0}
                    alt="logo"
                    loading="lazy"
                    sizes="30"
                    className="h-full w-full cursor-pointer"
                  />
                ) : (
                  <CircleUser className="h-5 w-5 cursor-pointer" />
                )}
              </div>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.username ? user.username : "John Doe"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email ? user.email : "john-doe@domain.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/" className="flex items-center">
              <LayoutGrid className="mr-3 h-4 w-4 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/account" className="flex items-center">
              <User className="mr-3 h-4 w-4 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <ChangeProfile token={token} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <UserLogout token={token} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
