import React from 'react';
import ProfileCard from './ProfileCard';
import { Check, CirclePlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const PremiumFeature = () => {
  return (
    <ProfileCard
      icon={<CirclePlus size={18} />}
      title="Premium Features"
      accentColor="bg-blue-500"
      className="bg-gradient-to-br from-white via-white to-blue-50 border-blue-100"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
            PRO
          </Badge>
          <h3 className="font-medium">Unlock advanced features</h3>
        </div>

        <p className="text-gray-600">
          Get unlimited access to AI-powered video analysis and premium features
          designed for professionals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="flex items-start gap-2">
            <div className="mt-0.5 flex-shrink-0 rounded-full bg-blue-100 p-1">
              <Check size={14} className="text-blue-700" />
            </div>
            <div>
              <p className="font-medium text-sm">Unlimited Analysis</p>
              <p className="text-xs text-gray-500">
                No more limits on video processing
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="mt-0.5 flex-shrink-0 rounded-full bg-blue-100 p-1">
              <Check size={14} className="text-blue-700" />
            </div>
            <div>
              <p className="font-medium text-sm">Advanced AI Models</p>
              <p className="text-xs text-gray-500">
                Access to our latest algorithms
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="mt-0.5 flex-shrink-0 rounded-full bg-blue-100 p-1">
              <Check size={14} className="text-blue-700" />
            </div>
            <div>
              <p className="font-medium text-sm">Priority Support</p>
              <p className="text-xs text-gray-500">Get help within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="mt-0.5 flex-shrink-0 rounded-full bg-blue-100 p-1">
              <Check size={14} className="text-blue-700" />
            </div>
            <div>
              <p className="font-medium text-sm">Batch Processing</p>
              <p className="text-xs text-gray-500">
                Analyze multiple videos at once
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
            Upgrade to Premium
          </Button>
          <Button variant="ghost" className="w-full sm:w-auto text-blue-600">
            View all features
          </Button>
        </div>
      </div>
    </ProfileCard>
  );
};

export default PremiumFeature;
