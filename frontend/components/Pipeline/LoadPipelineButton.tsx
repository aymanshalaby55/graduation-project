import { PlayCircle } from "lucide-react";
import React, { useCallback } from "react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";

interface LoadPipelineProps {
  id: string;
}

const LoadPipelineButton = ({ id }: LoadPipelineProps) => {
  const router = useRouter();
  const { data: pipelineData } = useQuery({
    queryKey: ["Pipeline", id],
    queryFn: async () => {
      const { data } = await api.get(`pipeline/getPipeline/${id}`);
      return data;
    },
  });
  const loadSavedPipeline = useCallback(async () => {
    try {
      const savedFlow = pipelineData.flowData;
      const encodedFlow = encodeURIComponent(savedFlow); // Encode the pipeline data
      router.push(`/videos?pipeline=${encodedFlow}`); // Navigate to the main screen with the pipeline data
    } catch (error) {
      console.error("Error loading pipeline:", error);
    }
  }, [pipelineData?.flowData, router]);
  return (
    <button
      onClick={loadSavedPipeline}
      style={{
        padding: "8px 16px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Load Pipeline
    </button>
  );
};

export default LoadPipelineButton;
