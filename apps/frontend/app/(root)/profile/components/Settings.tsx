import React from 'react';
import PersonalInfo from './PersonalInfo';
import PremiumFeature from './PremiumFeature';
import AccountManagement from './AccountManagement';
import ConnectedAccounts from './ConnectedAccounts';
import RecentActivity from './RecentActivity';
import UserProfileHeader from './UserProfileHeader';

const Setting = () => {
  return (
    <>
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
          <ConnectedAccounts />
          <RecentActivity />
        </div>
      </div>
    </>
  );
};

export default Setting;
