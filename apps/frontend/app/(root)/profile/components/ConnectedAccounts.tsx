'use client';

import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import ProfileCard from './ProfileCard';
import { Settings } from 'lucide-react';
import { useState } from 'react';

const ConnectedAccountItem = ({
  provider,
  icon,
  isConnected = false,
  onToggle,
}: {
  provider: string;
  icon: string;
  isConnected?: boolean;
  onToggle: () => void;
}) => (
  <div className="flex items-center justify-between w-full p-4 rounded-lg bg-gray-50 border border-gray-100 transition-all duration-200 hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <div className="relative w-8 h-8 flex items-center justify-center bg-white rounded-full border border-gray-200 p-1">
        <Image
          src={`/images/${icon}.svg`}
          alt={provider}
          width={20}
          height={20}
          className="rounded"
        />
        {isConnected && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white" />
        )}
      </div>
      <span className="font-medium">{provider}</span>
    </div>
    <div className="flex items-center gap-3">
      {/* <Badge
        variant={isConnected ? 'secondary' : 'outline'}
        className={
          isConnected
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'text-gray-500'
        }
      >
        {isConnected ? 'Connected' : 'Disconnected'}
      </Badge> */}
      <Switch
        checked={isConnected}
        onCheckedChange={onToggle}
        className={`${isConnected ? 'bg-green-500' : 'bg-gray-200'}`}
      />
    </div>
  </div>
);

const ConnectedAccounts = () => {
  const [facebookConnected, setFacebookConnected] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(true);
  const [twitterConnected, setTwitterConnected] = useState(false);

  return (
    <ProfileCard
      icon={<Settings size={18} />}
      title="Connected Accounts"
      accentColor="bg-purple-500"
    >
      <div className="space-y-3">
        <p className="text-sm text-gray-600 mb-2">
          Link your social accounts for easier login and content sharing.
        </p>

        <div className="space-y-3 mt-4">
          <ConnectedAccountItem
            provider="Facebook"
            icon="facebook"
            isConnected={facebookConnected}
            onToggle={() => setFacebookConnected(!facebookConnected)}
          />
          <ConnectedAccountItem
            provider="Google"
            icon="google"
            isConnected={googleConnected}
            onToggle={() => setGoogleConnected(!googleConnected)}
          />
          <ConnectedAccountItem
            provider="Twitter"
            icon="twitter"
            isConnected={twitterConnected}
            onToggle={() => setTwitterConnected(!twitterConnected)}
          />
        </div>
      </div>
    </ProfileCard>
  );
};

export default ConnectedAccounts;
