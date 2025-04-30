"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useVideoAnalysisContext } from "@/app/context/VideoAnalysisContext";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Check, Film, Trash2, Upload } from "lucide-react";
import FightDetectionButton from "./AnalizeButton";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import VideoUploader from "../shared/VideoUploader";

interface Video {
  _id: string;
  videoPath: string;
  originalName: string;
}

interface ChooseVideosModalProps {
  videos: Video[] | null | undefined;
}

export function ChooseVideosModal({ videos }: ChooseVideosModalProps) {
  const { setVideoAnalysisData, videoAnalysisData } = useVideoAnalysisContext();
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleVideoSelect = (videoPath: string) => {
    setSelectedVideos((prev) => {
      const isSelected = prev.includes(videoPath);
      const updated = isSelected
        ? prev.filter((path) => path !== videoPath)
        : [...prev, videoPath];

      setVideoAnalysisData((prevData: any) => ({
        ...prevData,
        videos: updated,
      }));

      return updated;
    });
  };

  const handleClearSelection = () => {
    setSelectedVideos([]);
    setVideoAnalysisData((prev: any) => ({
      ...prev,
      videos: [],
    }));
  };

  const ModalContent = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] overflow-y-auto">
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Select Videos for Analysis</h2>
            <Badge variant="secondary" className="h-6">
              {selectedVideos.length} selected
            </Badge>
          </div>

          {!videos || videos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Film className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">
                No videos uploaded
              </p>
              {/* <Button variant="outline" className="mt-4">
                <Upload className="mr-2 h-4 w-4" />
                Upload Videos
              </Button> */}
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {videos.map((video) => (
                  <motion.div
                    key={video._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    className={`relative rounded-lg border ${
                      selectedVideos.includes(video.videoPath)
                        ? "border-primary ring-2 ring-primary"
                        : "border-border"
                    } overflow-hidden cursor-pointer transition-colors`}
                    onClick={() => handleVideoSelect(video.videoPath)}
                  >
                    {/* Video Preview */}
                    <div className="aspect-video bg-muted relative group">
                      <video
                        src={video.videoPath}
                        className="w-full h-full object-cover"
                        preload="metadata"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="secondary" size="sm">
                          {selectedVideos.includes(video.videoPath) ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Selected
                            </>
                          ) : (
                            "Select Video"
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-3">
                      <p
                        className="font-medium truncate"
                        title={video.originalName}
                      >
                        {video.originalName}
                      </p>
                    </div>

                    {/* Selection Indicator */}
                    {selectedVideos.includes(video.videoPath) && (
                      <div className="absolute top-2 right-2">
                        <Badge>
                          <Check className="h-3 w-3 mr-1" />
                          Selected
                        </Badge>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center px-6 py-4 border-t">
          <Button
            variant="outline"
            onClick={handleClearSelection}
            disabled={selectedVideos.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Selection ({selectedVideos.length})
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="relative">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="group/modal-btn relative overflow-hidden"
            variant="default"
          >
            <span className="group-hover/modal-btn:translate-x-40 inline-flex items-center transition duration-500">
              <Film className="mr-2 h-4 w-4" />
              {selectedVideos.length > 0
                ? `${selectedVideos.length} Videos Selected`
                : "Choose Videos"}
            </span>
            <span className="-translate-x-40 group-hover/modal-btn:translate-x-0 absolute inset-0 flex items-center justify-center transition duration-500">
              ✈️
            </span>
          </Button>
        </DialogTrigger>
        {typeof window !== "undefined" &&
          createPortal(<ModalContent />, document.body)}
      </Dialog>
    </div>
  );
}
