import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import ProfileCard from './ProfileCard';
import { AlertCircle, Shield } from 'lucide-react';

const TwoFA = () => {
  return (
    <ProfileCard
      icon={<Shield size={18} />}
      title="2FA"
      accentColor="bg-amber-500"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Status</span>
          <Badge
            variant="outline"
            className="bg-red-100 text-red-700 border-red-200"
          >
            Not Enabled
          </Badge>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
          <div className="flex items-center gap-2 text-amber-700 mb-2">
            <AlertCircle size={16} />
            <p className="text-sm font-medium">Recommended</p>
          </div>
          <p className="text-xs text-amber-700">
            We strongly recommend enabling 2FA to protect your account.
          </p>
        </div>

        <p className="text-sm text-gray-600">
          Improve your account security by requiring both your password and a
          verification code sent to your phone.
        </p>

        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
          Enable 2FA
        </Button>
      </div>
    </ProfileCard>
  );
};

export default TwoFA;
