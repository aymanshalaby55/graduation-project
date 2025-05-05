'use client'
import React from 'react';
import ProfileCard from './ProfileCard';
import { Skeleton } from '@/components/ui/skeleton';
import EditUserForm from '@/components/shared/EditUserForm';
import { User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { UserInfoProps } from '@/types';
import api from '@/utils/api';

const PersonalInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userInfo, isLoading } = useQuery<UserInfoProps>({
    queryKey: ['user', id],
    queryFn: async () => {
      const { data } = await api.get(`/users/${id}`);
      return data;
    },
  });
  const formattedDate = userInfo?.dateOfBirth
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(userInfo.dateOfBirth))
    : 'Date not available';
  return (
    <ProfileCard icon={<User size={18} />} title="Personal Information">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-2/3" />
        </div>
      ) : (
        <EditUserForm
          username={userInfo?.username || ''}
          email={userInfo?.email || ''}
          dateOfBirth={formattedDate || ''}
          userId={id}
        />
      )}
    </ProfileCard>
  );
};

export default PersonalInfo;
