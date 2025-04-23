import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UserProfileHeader = () => (
  <div className="mb-6 flex items-start flex-col md:flex-row gap-4 justify-between">
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
      <p className="text-gray-500">Manage your profile information and account preferences</p>
    </div>
    <Button variant="outline" className="flex items-center gap-2">
      <Settings size={16} />
      Advanced Settings
    </Button>
  </div>
);

export default UserProfileHeader;
