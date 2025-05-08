/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";
import { useToast } from "../ui/use-toast";

const DeleteVideoButton = ({ videoId }: { videoId: string }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: deleteVideo, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await api.delete(`videos/deleteVideo/${videoId}`);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userVideos"] });
      toast({
        title: "Success",
        description: "Video deleted successfully",
      });
      console.log(data);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to delete video",
        variant: "destructive",
      });
    },
  });

  return (
    <Button
      className="bg-transparent text-red-500 p-0 hover:bg-transparent"
      disabled={isPending}
      onClick={() => deleteVideo()}
    >
      Delete
    </Button>
  );
};

export default DeleteVideoButton;
