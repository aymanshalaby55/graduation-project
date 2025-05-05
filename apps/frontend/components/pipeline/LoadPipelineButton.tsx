import React, { useCallback } from 'react';
import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

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
      className="text-white  h-[40px]"
      variant={'default'}
    >
      Clone
    </Button>
  );
};

export default LoadPipelineButton;
