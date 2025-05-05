'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import api from '@/utils/api';

interface ModelInfo {
  modelName: string;
  modelUrl: string;
  version: string;
  accuracy: number;
  id: string;
}

const EditModelForm = ({
  id,
  modelName,
  modelUrl,
  version,
  accuracy,
}: ModelInfo) => {
  const { mutate: editModel, isPending } = useMutation({
    mutationFn: async (modelData: any) => {
      const { data } = await api.patch(`aiModels/update/${id}`, modelData);
      return data;
    },
    onSuccess: () => {
      router.push('/dashboard/models');
    },
  });

  const ModelValidation = z.object({
    modelName: z.string(),
    modelUrl: z.string().url(),
    version: z.string(),
    accuracy: z.number().min(0).max(100),
  });
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(ModelValidation),
    defaultValues: {
      modelName: modelName || '',
      modelUrl: modelUrl || '',
      version: version || '1',
      accuracy: accuracy || 0,
    },
  });

  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof ModelValidation>) {
    editModel(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-5 rounded-lg"
      >
        <h1 className="text-center text-2xl font-semibold">Edit Model</h1>
        <div className="flex flex-row w-full gap-5">
          <FormField
            control={form.control}
            name="modelName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Model Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="modelUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Model URL</FormLabel>
                <FormControl>
                  <Input
                    className="w-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row w-full gap-5">
          <FormField
            control={form.control}
            name="version"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Model Version</FormLabel>
                <FormControl>
                  <Input
                    className="w-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accuracy"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Model Accuracy</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="w-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={isPending} variant="default" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditModelForm;
