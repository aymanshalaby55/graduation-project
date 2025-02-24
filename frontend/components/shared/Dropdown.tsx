'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserContext } from "@/app/context/UserContext";
import { Button } from "../ui/button";
import Link from "next/link";

import { AnimatedTooltip } from "../ui/animated-tooltip";



const Dropdown = () => {
  const { user, logout }: any = useUserContext();
  const people = [
    {
      id: 1,
      name: user?.user?.username,
      designation: "Software Engineer",
      image:'/images/avatar.png'
    },
  ];
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
        <AnimatedTooltip items={people} />
          {/* <Avatar>
            <AvatarFallback className="text-black">
              {user?.user?.username?.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user?.user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/profile/${user?.user?._id}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/videos/user">Video Manager</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {user?.user?.role === "admin" && (
            <>
              <DropdownMenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem>
            <Button className="w-full" onClick={() => logout()}>
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Dropdown;
