'use client';

import { useState } from 'react';
import UserProfileSidebar from '@/app/(root)/profile/components/UserProfileSidebar';
import UserProfileHeader from '../components/UserProfileHeader';
import PersonalInfo from '../components/PersonalInfo';
import PremiumFeature from '../components/PremiumFeature';
import AccountManagement from '../components/AccountManagement';
import ConnectedAccounts from '../components/ConnectedAccounts';
import TwoFA from '../components/2FA';
import RecentActivity from '../components/RecentActivity';

const UserProfile = () => {

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <UserProfileSidebar />
        </div>

        {/* Main Content */}
        <div className="md:col-span-11">
          <UserProfileHeader />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              <PersonalInfo />
              <PremiumFeature />
              <AccountManagement />
            </div>
            {/* Right Column */}
            <div className="md:col-span-1 space-y-6">
              <TwoFA/>
              <ConnectedAccounts />
              <RecentActivity/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
