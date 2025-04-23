import React from 'react';
import ProfileCard from './ProfileCard';
import { Badge, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
const ActivityItem = ({
  title,
  time,
  type = 'default',
}: {
  title: string;
  time: string;
  type?: 'default' | 'warning' | 'success';
}) => {
  const colors = {
    default: 'border-blue-500 bg-blue-50',
    warning: 'border-amber-500 bg-amber-50',
    success: 'border-green-500 bg-green-50',
  };

  return (
    <div className={`border-l-2 pl-3 py-2 ${colors[type]}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  );
};

const RecentActivity = () => {
  return (
    <ProfileCard
      icon={<Bell size={18} />}
      title="Recent Activity"
      accentColor="bg-green-500"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-700">Last 7 days</p>
          <Badge className="bg-gray-100 text-gray-700">3 events</Badge>
        </div>

        <div className="space-y-2">
          <ActivityItem
            title="Login from New York, NY"
            time="Today, 2:45 PM"
            type="success"
          />
          <ActivityItem
            title="Password Changed"
            time="Apr 18, 10:30 AM"
            type="warning"
          />
          <ActivityItem
            title="Login from Chicago, IL"
            time="Apr 15, 8:15 AM"
            type="success"
          />
        </div>

        <div className="pt-3 mt-3 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-blue-600 hover:bg-blue-50"
          >
            View All Activity
          </Button>
        </div>
      </div>
    </ProfileCard>
  );
};

export default RecentActivity;
