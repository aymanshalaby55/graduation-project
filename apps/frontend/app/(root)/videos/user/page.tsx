'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Upload,
  Play,
  ArrowUpDown,
  ChevronDown,
  FileVideo,
  Trash,
  Tag,
  X,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import VideoUploader from '@/components/shared/VideoUploader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import api from '@/utils/api';

interface Video {
  id?: string;
  _id?: string;
  title: string;
  originalName: string;
  videoSize: number;
  videoPath: string;
  tags?: string[];
}

interface SortConfig {
  key: keyof Video;
  direction: 'asc' | 'desc';
}

export default function VideoManager() {
  const { data: userVideos } = useQuery({
    queryKey: ['userVideos'],
    queryFn: async () => {
      const { data } = await api.get(`videos/getUserVideos`);
      return data;
    },
  });

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'title',
    direction: 'asc',
  });

  const videos = userVideos?.data?.userVideos || [];

  const handlePlayVideo = (videoPath: string) => {
    setSelectedVideo(videoPath);
  };

  const handleSort = (key: keyof Video) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedVideos(
        videos.map((video: Video) => video.id || video._id || '')
      );
    } else {
      setSelectedVideos([]);
    }
  };

  const handleSelectVideo = (videoId: string, checked: boolean) => {
    if (checked) {
      setSelectedVideos([...selectedVideos, videoId]);
    } else {
      setSelectedVideos(selectedVideos.filter((id) => id !== videoId));
    }
  };

  function formatFileSize(bytes: number): string {
    if (!bytes || bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
  }

  const sortedVideos = useMemo(() => {
    if (!videos.length) return [];

    return [...videos].sort((a, b) => {
      if (sortConfig.key === 'videoSize') {
        return sortConfig.direction === 'asc'
          ? a.videoSize - b.videoSize
          : b.videoSize - a.videoSize;
      }

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [videos, sortConfig]);

  return (
    <div className="container py-8 max-w-7xl mx-auto px-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Your Videos</h1>
          <div className="flex flex-wrap md:flex-row flex-row-reverse gap-2">
            {selectedVideos.length > 0 && (
              <>
                <Button variant="destructive" size="sm">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedVideos.length})
                </Button>
                <Link href={'/flow'}>
                  <Button variant="default" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Analyze Selected ({selectedVideos.length})
                  </Button>
                </Link>
              </>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-lg" variant="secondary">
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
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="w-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      <Checkbox
                        checked={
                          selectedVideos.length === videos.length &&
                          videos.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    {/* <th className="h-12 px-4 text-left align-middle font-medium w-12">Preview</th> */}
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      <button
                        className="flex items-center font-medium"
                        onClick={() => handleSort('title')}
                      >
                        Title
                        <ArrowUpDown
                          className={`ml-2 h-4 w-4 ${sortConfig.key === 'title' ? 'text-primary' : 'text-muted-foreground'}`}
                        />
                      </button>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      <button
                        className="flex items-center font-medium"
                        onClick={() => handleSort('originalName')}
                      >
                        File Name
                        <ArrowUpDown
                          className={`ml-2 h-4 w-4 ${sortConfig.key === 'originalName' ? 'text-primary' : 'text-muted-foreground'}`}
                        />
                      </button>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      <button
                        className="flex items-center font-medium"
                        onClick={() => handleSort('videoSize')}
                      >
                        Size
                        <ArrowUpDown
                          className={`ml-2 h-4 w-4 ${sortConfig.key === 'videoSize' ? 'text-primary' : 'text-muted-foreground'}`}
                        />
                      </button>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Tags
                    </th>
                    <th className="h-12 px-4 text-right align-middle font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedVideos.map((video) => (
                    <tr
                      key={video.id || video._id}
                      className="border-b hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-4 align-middle">
                        <Checkbox
                          checked={selectedVideos.includes(
                            video.id || video._id
                          )}
                          onCheckedChange={(checked) =>
                            handleSelectVideo(
                              video.id || video._id || '',
                              !!checked
                            )
                          }
                        />
                      </td>
                      {/* <td className="p-4 align-middle">
                        <div className="bg-muted rounded-md p-2 flex-shrink-0">
                          <FileVideo className="h-5 w-5 text-primary" />
                        </div>
                      </td> */}
                      <td className="p-4 align-middle font-medium flex gap-2">
                        <FileVideo className="h-5 w-5 text-primary" />{' '}
                        {video.title}
                      </td>
                      <td className="p-4 align-middle truncate max-w-xs">
                        {video.originalName}
                      </td>
                      <td className="p-4 align-middle">
                        {formatFileSize(video.videoSize)}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex flex-wrap gap-1">
                          {video.tags && video.tags.length > 0 ? (
                            video.tags.map((tag: string, index: number) => (
                              <div
                                key={index}
                                className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center"
                              >
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </div>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              No tags
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Open menu</span>
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handlePlayVideo(video.videoPath)}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              <span>Play</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Tag className="mr-2 h-4 w-4" />
                              <span>Edit Tags</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                  {!sortedVideos.length && (
                    <tr>
                      <td
                        colSpan={7}
                        className="h-24 text-center text-muted-foreground p-4"
                      >
                        No videos found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
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
