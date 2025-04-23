'use cleint';
import { Bell, LogOut, Settings, Shield, User } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import Image from 'next/image';
import { Tooltip, TooltipProvider } from '../../../../components/ui/tooltip';

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
  const [activeTab, setActiveTab] = useState('profile');
  return (
    <div className="sticky top-24 flex md:flex-col flex-row items-center gap-6 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
      <div className="relative">
        <Image
          width={60}
          height={60}
          alt="User Avatar"
          src="/images/avatar.png"
          className="rounded-full border-2 border-white shadow-md"
        />
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
