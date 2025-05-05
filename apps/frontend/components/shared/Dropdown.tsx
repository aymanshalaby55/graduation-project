'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useUserContext } from '@/context/UserContext';

const Dropdown = () => {
  const { user, logout }: any = useUserContext();
  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={user?.user?.profilePicture}
              alt="User profile picture"
            />
            <AvatarFallback className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent text-2xl md:text-2xl font-medium tracking-tight text-center">
              {user?.user?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user?.user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleNavigation(`/profile/${user?.user?._id}`)}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation(`/videos/user`)}>
            Video Manager
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {user?.user?.role === 'admin' && (
            <>
              <DropdownMenuItem onClick={() => handleNavigation('/dashboard')}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem
            onClick={() => logout()}
            className="flex items-center justify-center hover:bg-slate-100 cursor-pointer"
          >
            <LogOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Dropdown;
