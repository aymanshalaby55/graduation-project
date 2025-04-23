import React from 'react';
import ProfileCard from './ProfileCard';
import { AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AccountManagement = () => {
  return (
    <ProfileCard
      icon={<FileText size={18} />}
      title="Account Management"
      accentColor="bg-gray-400"
    >
      <div className="space-y-6">
        <div className="pb-4 border-b border-gray-100">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <FileText size={16} className="text-gray-500" />
            Export Your Data
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Download a copy of all your data including profile information,
            analysis history, and preferences.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <FileText size={14} /> JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <FileText size={14} /> CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <FileText size={14} /> PDF
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-red-600 mb-2 flex items-center gap-2">
            <AlertCircle size={16} className="text-red-500" />
            Account Deactivation
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Temporarily disable your account and pause all services. Your data
            will be preserved, and you can reactivate at any time.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            Deactivate Account
          </Button>
        </div>
      </div>
    </ProfileCard>
  );
};

export default AccountManagement;
