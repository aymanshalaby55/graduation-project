import React, { useCallback } from 'react';
import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import api from '@/app/utils/api';
import { useRouter } from 'next/navigation';

interface LoadPipelineProps {
  id: string;
}

const LoadPipelineButton = ({ id }: LoadPipelineProps) => {
  const router = useRouter();
  const { data: pipelineData } = useQuery({
    queryKey: ['Pipeline', id],
    queryFn: async () => {
      const { data } = await api.get(`pipeline/getPipeline/${id}`);
      return data;
    },
  });
  const loadSavedPipeline = useCallback(async () => {
    try {
      const savedFlow = pipelineData.flowData;
      const encodedFlow = encodeURIComponent(savedFlow);
      router.push(`/flow?pipeline=${encodedFlow}`);
    } catch (error) {
      console.error('Error loading pipeline:', error);
    }
  }, [pipelineData?.flowData, router]);
  return (
    <Button
      onClick={loadSavedPipeline}
      className="text-white bg-[#4CAF50] hover:bg-[#4CAF50]/90"
      variant={'default'}
    >
      Load Pipeline
    </Button>
  );
};

export default LoadPipelineButton;
