"use client";

import { memo, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Handle, Position } from "@xyflow/react";
import { AlertCircle, CheckCircle2, Loader2, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useVideoAnalysisContext } from "@/app/context/VideoAnalysisContext";
import api from "@/app/utils/api";

const FightDetectionButton = ({ nodes }: { nodes: any[] }) => {
  const { videoAnalysisData, socketStatus } = useVideoAnalysisContext();
  const [jobIds, setJobIds] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const { mutate: analyzeVideo, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await api.post(`aiCalls/addVideosToQueue`, {
          videos: videoAnalysisData.videos,
        });
        return data;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      setJobIds(data.map((job: { id: any }) => String(job.id)));
    },
    onError: (error) => {
      console.error("Analysis failed:", error);
    },
  });

  const handleAnalyzeClick = () => {
    setShowDialog(true);
    analyzeVideo();
  };

  const getProgressDetails = () => {
    if (jobIds.length === 0)
      return { progress: 0, phase: "Waiting for job...", status: "waiting" };

    let totalProgress = 0;
    let completedJobs = 0;

    jobIds.forEach((jobId) => {
      const job = socketStatus[jobId];
      if (job) {
        if (job.status === "completed") {
          completedJobs += 1;
        }
        totalProgress += job.progress || 0;
      }
    });

    const averageProgress = totalProgress / jobIds.length;

    if (completedJobs === jobIds.length) {
      return {
        progress: 100,
        phase: "Analysis Complete!",
        status: "completed",
      };
    }

    return {
      progress: averageProgress,
      phase: "Processing...",
      status: "processing",
    };
  };

  const progressDetails = getProgressDetails();

  useEffect(() => {
    if (jobIds.length > 0) {
      const allJobsCompleted = jobIds.every(
        (jobId) => socketStatus[jobId]?.status === "completed"
      );
      if (allJobsCompleted) {
        const timer = setTimeout(() => {
          setShowDialog(false);
          setJobIds([]);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [socketStatus, jobIds]);

  const isDisabled =
    isPending ||
    (jobIds.length > 0 && socketStatus[jobIds[0]]?.status !== "completed") ||
    !nodes ||
    nodes.length < 2 ||
    nodes.every((node) => node.type === nodes[0].type);

  return (
    <div className="relative">
      <Button
        size="lg"
        variant="default"
        onClick={handleAnalyzeClick}
        disabled={isDisabled}
        className="w-full gap-2 font-medium"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <PlayCircle className="h-4 w-4" />
        )}
        Analyze Video
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {progressDetails.status === "completed" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : progressDetails.status === "error" ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}
              Video Analysis Progress
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {Object.entries(socketStatus).map(([jobId, job]) => (
              <Card key={jobId} className="overflow-hidden">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Job {jobId}</div>
                    <div className="text-xs px-2 py-1 rounded-full bg-muted">
                      {job.status}
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-muted">
                      {job.progress}%
                    </div>
                  </div>

                  <Progress value={job.progress} className="h-2" />

                  {job.status === "in-progress" && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Processing...
                    </div>
                  )}

                  {job.modelResult && (
                    <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto">
                      Humans Detected.
                    </pre>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(FightDetectionButton);
