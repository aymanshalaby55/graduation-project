"use client";

import LoadPipelineButton from "@/components/pipeline/LoadPipelineButton";
import FlowPreview from "@/components/shared/FlowPreview";
import { Button } from "@/components/ui/button";
import api from "@/utils/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useUserContext } from "@/context/UserContext"; // Import user context

const Page = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { user } = useUserContext(); // Get current user from context
  const currentUserId = user?.user?._id;
  console.log("currentUserId", currentUserId);
  

  // Fetch pipeline data
  const {
    data: pipelineData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pipeline", id],
    queryFn: async () => {
      const { data } = await api.get(`pipeline/getPipeline/${id}`);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  // Mutation to toggle starred status
  const toggleStarMutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.put(`/pipeline/toggleFavorite/${id}`);
      return data;
    },
    onSuccess: (data) => {
      // Update query cache with new starredBy array
      queryClient.setQueryData(["pipeline", id], (oldData) => ({
        ...oldData,
        starredBy: data.starredBy,
      }));
    },
    onError: (error) => {
      console.error("Error toggling star:", error);
    },
  });

  // Determine if the current user has starred this pipeline
  const isStarredByUser = pipelineData?.starredBy?.includes(currentUserId);
  console.log("isStarredByUser", isStarredByUser);
  const handleToggleStar = () => {
    toggleStarMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-xl font-semibold">Loading pipeline...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-semibold text-red-500">
          Error loading pipeline. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 container p-10">
      {/* Header */}
      <div className="flex justify-between gap-2">
        <div className="flex-grow">
          <p className="opacity-50">Pipeline for</p>
          <h1 className="text-2xl font-semibold">{pipelineData?.name}</h1>
        </div>
        <div className="flex flex-row gap-5 h-[40px]">
          <div className="flex flex-row">
            <Button
              className={`h-[40px] text-lg rounded-r-none cursor-pointer flex items-center justify-center p-2 gap-2 hover:bg-none ${
                isStarredByUser ? "text-yellow-500" : ""
              }`}
              variant="outline"
              onClick={handleToggleStar}
              disabled={toggleStarMutation.isLoading}
            >
              <Star
                size={20}
                fill={isStarredByUser ? "#facc15" : "none"}
              />
              <span>Star</span>
            </Button>
            <div className="px-4 border h-[40px] flex items-center justify-center p-2 rounded-r-md">
              <span>{pipelineData?.starredBy?.length || 0}</span>
            </div>
          </div>
          <LoadPipelineButton id={id.toString()} />
        </div>
      </div>

      <hr className="my-10" />

      {/* Flow Preview */}
      <FlowPreview pipelineId={id.toString()} />
    </div>
  );
};

export default Page;
