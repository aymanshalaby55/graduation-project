'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '../ui/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/app/utils/api';
import Image from 'next/image';
import { FileUpload } from '@/components/ui/file-upload'; // Import Aceternity UI FileUpload
import { useUserContext } from '@/app/context/UserContext';
import { Label } from '../ui/label';

const VideoUploader = () => {
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { user }: any = useUserContext();

  const formSchema = z.object({
    videoPath: z.string().nonempty('Video path is required'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoPath: '',
    },
  });

  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await api.get(`users/getUser/${user?.user?._id}`);
      return data;
    },
  });

  const { mutate: uploadVideo } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post('/videos/uploadVideo', formData);
      return data;
    },
    onSuccess: (data) => {
      setVideoUrl(data?.videoPath);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast({
        title: "You've successfully uploaded the video!",
        variant: 'default',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to upload the video.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleFileChange = (files: File[]) => {
    const file = files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'The file size exceeds the 100MB limit.',
          variant: 'destructive',
        });
      } else {
        setSelectedFile(file);
        form.setValue('videoPath', file.name);
      }
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please select a video file to upload.',
        variant: 'destructive',
      });
      return;
    }
    const formData = new FormData();
    formData.append('videoPath', selectedFile);
    uploadVideo(formData);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-fit  bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                className="!outline-none"
                placeholder="Enter video title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="video">Video File</Label>
              <FileUpload onChange={handleFileChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                className="!outline-none"
                placeholder="Add tags separated by commas"
              />
            </div>
            <Button
              type="submit"
              className="w-full inline-flex p-2 text-md animate-shimmer rounded-md border border-slate-800 
            bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-white transition-colors"
            >
              Upload
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VideoUploader;
