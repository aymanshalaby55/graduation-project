'use client';

import React from 'react';
import { ChooseVideosModal } from './ChooseVideosModel';
import { useQuery } from '@tanstack/react-query';
import api from '@/app/utils/api';
import VideoUploader from '../shared/VideoUploader';

interface Video {
  _id: string;
  videoPath: string;
  originalName: string;
}

interface VideoSelectorProps {
  videos: any;
}

const VideoSelector:React.FC<VideoSelectorProps> = ({ videos }) => {
  const { data: userVideos } = useQuery({
    queryKey: ['userVideos'],
    queryFn: async () => {
      const { data } = await api.get(`videos/getUserVideos`);
      return data;
    },
  });

  return (
    <div className="pt-2">
      <ChooseVideosModal videos={userVideos?.data?.userVideos} />
    </div>
  );
};

export default VideoSelector;
