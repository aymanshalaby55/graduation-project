'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Upload, Play, Tag, FileVideo, X } from 'lucide-react';
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
  const [open, setOpen] = useState(false);

  const handlePlayVideo = (videoPath: string) => {
    setSelectedVideo(videoPath);
  };
  function formatFileSize(bytes: number): string {
    if (!bytes || bytes === 0) return "0 Bytes"
  
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
  
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }
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
        <Card key={video.id || video._id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-4 flex items-start gap-4">
              <div className="bg-muted rounded-md p-3 flex-shrink-0">
                <FileVideo className="h-8 w-8 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-lg mb-1 truncate">{video.title}</h3>

                <div className="grid gap-1 text-sm text-muted-foreground">
                  <p className="truncate">
                    <span className="font-medium">Original file:</span> {video.originalName}
                  </p>
                  <p>
                    <span className="font-medium">Size:</span> {formatFileSize(video.videoSize)}
                  </p>
                  <p className="truncate">
                    <span className="font-medium">Path:</span> {video.videoPath}
                  </p>
                </div>

                {video.tags && video.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {video.tags.map((tag: string, index: number) => (
                      <div
                        key={index}
                        className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-shrink-0">
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-primary hover:text-primary/80"
                  // onClick={() => handlePlayVideo && handlePlayVideo(video.videoPath)}
                >
                  <X className="h-4 w-4 mr-1" />
                </Button>
              </div>
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
