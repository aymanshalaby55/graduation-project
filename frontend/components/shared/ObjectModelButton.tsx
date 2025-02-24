"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import axios from "axios";
import { useVideoAnalysisContext } from "@/app/context/VideoAnalysisContext";

interface AnalyzeButtonProps {
  text: string;
  videoUrl: string;
}

const ObjectModelButton = ({ text, videoUrl }: AnalyzeButtonProps) => {
  const { setVideoAnalysisData, setModel }: any = useVideoAnalysisContext();
  const { mutate: analyzeVideo, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.post(`http://127.0.0.1:5000/detect`, {
          video_url: videoUrl,
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      setVideoAnalysisData(data);
    },
  });

  return (
    <Button
      className="p-3"
      onClick={() => {
        analyzeVideo();
        setModel("vDetection");
      }}
      disabled={isPending}
    >
      {text}
    </Button>
  );
};

export default ObjectModelButton;
