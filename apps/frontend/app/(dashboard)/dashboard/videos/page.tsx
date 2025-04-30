"use client"

import api from "@/app/utils/api"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileVideo, Play, Tag } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const Videos = () => {
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const { data } = await api.get("/videos/getAllVideos")
      return data
    },
  })

  const handlePlayVideo = (videoPath: string) => {
    // You can implement video playback logic here
    console.log("Playing video:", videoPath)
    // For example, open in a modal or navigate to a player page
  }

  // Format file size to human-readable format
  const formatFileSize = (bytes: number): string => {
    if (!bytes || bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Videos</h1>
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-14 w-14 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-1" />
                    <Skeleton className="h-4 w-2/3 mb-1" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          Error loading videos. Please try again later.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Videos</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {videos?.data?.videos?.map((video: any) => (
          <Card key={video._id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="p-4 flex items-start gap-4">
                <div className="bg-muted rounded-md p-3 flex-shrink-0">
                  <FileVideo className="h-8 w-8 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-lg mb-1 truncate">{video.title || "Untitled Video"}</h3>

                  <div className="grid gap-1 text-sm text-muted-foreground">
                    <p className="truncate">
                      <span className="font-medium">Original file:</span> {video.originalName || "Unknown"}
                    </p>
                    <p>
                      <span className="font-medium">Size:</span> {formatFileSize(video.videoSize || 0)}
                    </p>
                    <p className="truncate">
                      <span className="font-medium">Path:</span>{" "}
                      {video.videoPath}
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

                
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Videos
