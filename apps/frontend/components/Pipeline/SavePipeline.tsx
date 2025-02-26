'use client';

import React, { useCallback, useState } from 'react';
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

interface Pipeline {
  flowData?: string;
  name?: string;
  miniMapData?: string; // Add this field
}

const SavePipeline = ({ flowData }: Pipeline) => {
  const [name, setName] = useState<string>('');
  const { getNodes, getEdges, getViewport } = useReactFlow(); // Add this
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
        title: "Pipeline saved successfully!",
        description: 'Your pipeline has been saved. You can view it in the community section.',
        variant: 'default',
      });
      router.push('/community');
    },
    onError: (err: any) => {
      console.log(err);
      if (err.response.status === 409) {
        toast({
          title: 'هناك مستخدم بالفعل لهذه البيانات',
          description: 'يرجى استخدام بيانات مختلفة.',
          variant: 'destructive',
        });
      }
      if (err.response.status === 404) {
        toast({
          title: 'تأكد من كتابتك لجميع البيانات',
          description: 'يرجى التحقق من البيانات المدخلة والمحاولة مرة أخرى.',
          variant: 'destructive',
        });
      }
    },
  });

  const captureMiniMap = useCallback(() => {
    const nodes = getNodes();
    const edges = getEdges();
    const viewport = getViewport();
    
    return JSON.stringify({
      nodes,
      edges,
      viewport
    });
  }, [getNodes, getEdges, getViewport]);

  const handleSave = () => {
    const miniMapData = captureMiniMap();
    savePipeline({ flowData, name, miniMapData });
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
