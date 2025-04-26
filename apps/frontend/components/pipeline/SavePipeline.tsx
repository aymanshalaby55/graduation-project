'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/app/utils/api';
import { useToast } from '@/components/ui/use-toast';
import { useReactFlow } from '@xyflow/react';
// import { useReactFlow } from 'react-flow-renderer';

interface Pipeline {
  flowData: string;
  name: string;
}

const SavePipeline = ({ flowData }: { flowData: string }) => {
  const [name, setName] = useState<string>('');
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: savePipeline, isPending } = useMutation({
    mutationFn: async (pipelineData: Pipeline) => {
      const { data } = await api.post(`pipeline/createPipeline`, pipelineData);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: 'Success',
        description: 'Pipeline saved successfully.',
        variant: 'default',
      });
      router.push('/community');
    },
    onError: (err: any) => {
      console.log(err);
      if (err.response.status === 409) {
        toast({
          title: 'Error',
          description: 'There is already a user with this data.',
          variant: 'destructive',
        });
      }
      if (err.response.status === 404) {
        toast({
          title: 'Error',
          description: 'Please make sure all data is entered correctly.',
          variant: 'destructive',
        });
      }
    },
  });

  const { getNodes, getEdges, getViewport } = useReactFlow();

  const handleSave = () => {
    const currentFlow = {
      nodes: getNodes(),
      edges: getEdges(),
      viewport: getViewport(),
    };
    
    savePipeline({ 
      name,
      flowData: JSON.stringify(currentFlow)
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="z-50" variant={'default'}>
          Save Pipeline
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Pipeline</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="title"
              placeholder="Enter pipeline title"
            />
          </div>
          <Button
            onClick={handleSave}
            className="w-full"
            disabled={isPending}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavePipeline;
