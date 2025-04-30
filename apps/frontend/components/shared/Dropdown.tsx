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
import { useUserContext } from '@/app/context/UserContext';
import { Button } from '../ui/button';
import Link from 'next/link';
import { AnimatedTooltip } from '../ui/animated-tooltip';
import { useRouter } from 'next/navigation';

const Dropdown = () => {
  const { user, logout }: any = useUserContext();
  const router = useRouter();
  const people = [
    {
      id: 1,
      name: user?.user?.username,
      designation: 'Software Engineer',
      image: '/images/avatar.png',
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none'>
          <AnimatedTooltip items={people} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user?.user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleNavigation(`/profile/${user?.user?._id}`)}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation('/videos/user')}>
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

          <DropdownMenuItem>
            <Button className="w-full" onClick={() => { logout(); }}>
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Dropdown;
