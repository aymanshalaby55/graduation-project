'use client';
import { Bell, LogOut, Settings, Shield, User } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import Image from 'next/image';
import { Tooltip, TooltipProvider } from '../../../../components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserContext } from '@/app/context/UserContext';

const SidebarItem = ({
  icon,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 
      ${active ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-gray-700 hover:bg-gray-100'}`}
  >
    {icon}
  </button>
);
const UserProfileSidebar = () => {
  const { user, logout }: any = useUserContext();
  const [activeTab, setActiveTab] = useState('profile');
  return (
    <div className="sticky top-24 flex md:flex-col flex-row items-center gap-6 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
      <div className="relative">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={user?.user?.profilePicture}
            alt="User profile picture"
          />
          <AvatarFallback className="bg-gradient-to-br from-slate-300 to-slate-500  bg-clip-text text-transparent text-2xl md:text-2xl font-medium tracking-tight text-center">
            {user?.user?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
      </div>

      <div className="flex md:flex-col flex-row gap-4 w-full items-center">
        <TooltipProvider>
          <Tooltip>
            <SidebarItem
              icon={<User size={18} />}
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            />
          </Tooltip>

          <Tooltip>
            <SidebarItem
              icon={<Shield size={18} />}
              active={activeTab === 'security'}
              onClick={() => setActiveTab('security')}
            />
          </Tooltip>

          <Tooltip>
            <SidebarItem
              icon={<Bell size={18} />}
              active={activeTab === 'notifications'}
              onClick={() => setActiveTab('notifications')}
            />
          </Tooltip>

          <Tooltip>
            <SidebarItem
              icon={<Settings size={18} />}
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            />
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mt-auto">
        <TooltipProvider>
          <Tooltip>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <LogOut size={18} />
            </button>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
