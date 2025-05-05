'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  FileSearch2,
  Grid,
  LogOut,
  Settings,
  Star,
} from 'lucide-react';
import { Tooltip, TooltipProvider } from '../../../../components/ui/tooltip';
import Overview from '../components/Overview';
import Pipelines from '../components/Pipelines';
import Favourites from '../components/Favourites';
import Setting from '../components/Settings';
import { useUserContext } from '@/context/UserContext';

const SidebarItem = ({
  icon,
  title,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <Tooltip>
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 
        ${
          active
            ? 'bg-primary text-white dark:bg-primary'
            : 'text-gray-400 hover:bg-secondary hover:text-gray-600 dark:hover:bg-foreground dark:hover:text-gray-900'
        }`}
      aria-label={title}
    >
      {icon}
    </button>
  </Tooltip>
);

const UserProfileSidebar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const { logout } = useUserContext();
  const router = useRouter();

  const handleTabClick = (tab: string) => {
    if (tab === 'templates') {
      router.push('/community');
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="sticky top-24 flex md:flex-col flex-row items-center gap-6 p-4 rounded-2xl bg-white dark:bg-secondary shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex md:flex-col flex-row gap-4 w-full items-center">
        <TooltipProvider>
          <SidebarItem
            icon={<FileSearch2 size={18} />}
            title="Overview"
            active={activeTab === 'overview'}
            onClick={() => handleTabClick('overview')}
          />

          <SidebarItem
            icon={<BookOpen size={18} />}
            title="Pipelines"
            active={activeTab === 'pipelines'}
            onClick={() => handleTabClick('pipelines')}
          />

          <SidebarItem
            icon={<Star size={18} />}
            title="Favourites"
            active={activeTab === 'favourites'}
            onClick={() => handleTabClick('favourites')}
          />

          <SidebarItem
            icon={<Settings size={18} />}
            title="Settings"
            active={activeTab === 'settings'}
            onClick={() => handleTabClick('settings')}
          />
        </TooltipProvider>
      </div>

      <div className="mt-auto">
        <TooltipProvider>
          <Tooltip>
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={logout}
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'pipelines':
        return <Pipelines />;
      case 'favourites':
        return <Favourites />;
      case 'settings':
        return <Setting />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-1 ">
          <UserProfileSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="md:col-span-11">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserProfile;
