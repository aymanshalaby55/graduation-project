/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/api';
import { useToast } from '../ui/use-toast';
import { Trash } from 'lucide-react';

const DeleteVideosButton = ({ selectedVideos }: { selectedVideos: string[] }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: deleteVideos, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await api.delete('videos/deleteVideos', {
        data: { videoIds: selectedVideos }, // Make sure selectedVideos is accessible
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userVideos'] });
      toast({
        title: 'Success',
        description: 'Videos deleted successfully',
      });
      console.log(data);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to delete video',
        variant: 'destructive',
      });
    },
  });

  return (
    <Button
      className="cursor-pointer text-white" variant="destructive" size="sm"
      disabled={isPending}
      onClick={() => deleteVideos()}
    >
      <Trash className="h-4 w-4 mr-2" />
      Delete Selected ({selectedVideos.length})
    </Button>
  );
};

export default DeleteVideosButton;
