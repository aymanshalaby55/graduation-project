'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Upload, Play } from 'lucide-react';
import api from '@/app/utils/api';
import { useQuery } from '@tanstack/react-query';
import VideoUploader from '@/components/shared/VideoUploader';

export default function VideoManager() {
  const { data: userVideos } = useQuery({
    queryKey: ['userVideos'],
    queryFn: async () => {
      const { data } = await api.get(`videos/getUserVideos`);
      return data;
    },
  });

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handlePlayVideo = (videoPath: string) => {
    setSelectedVideo(videoPath);
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Your Videos</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-full sm:w-auto rounded-lg"
                variant="secondary"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Video
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload a new video</DialogTitle>
              </DialogHeader>
              <VideoUploader />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userVideos?.data?.userVideos.map((video: any) => (
            <Card key={video.id}>
              <CardContent className="p-0">
                <div className="relative group">
                  <video
                    src={video.videoPath}
                    className="w-full h-[180px] object-cover"
                    controls // Add controls for play, pause, volume, etc.
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handlePlayVideo(video.videoPath)}
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{video.originalName}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <Dialog
          open={!!selectedVideo}
          onOpenChange={() => setSelectedVideo(null)}
        >
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Video Player</DialogTitle>
            </DialogHeader>
            <video src={selectedVideo} className="w-full" controls autoPlay />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
