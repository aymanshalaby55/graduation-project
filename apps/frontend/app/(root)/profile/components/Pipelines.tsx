'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Swal from 'sweetalert2';
import Link from 'next/link';

import FlowPreview from '@/components/shared/FlowPreview';
import { useUserContext } from '@/context/UserContext';
import api from '@/utils/api';

interface Pipeline {
  _id: string;
  name: string;
  user: {
    username: string;
  };
  createdAt: Date;
  flowData: string;
}

const PageWrapper = ({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: boolean;
}) => (
  <div className="">
    <div className="flex flex-col gap-6">
      <div className="container mx-auto p-6 flex flex-col gap-6">
        <div className="flex sm:items-center items-start flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
          <h1 className="text-2xl font-semibold">My Pipelines</h1>
          <Link href="/flow">
            <Button variant={'secondary'} className="cursor-pointer">
              <span className="mr-1">+</span> Generate New
            </Button>
          </Link>
        </div>

        <div className="">
          <div className="relative inline-block">
            <select className="appearance-none cursor-pointer border rounded-md py-2 pl-3 pr-10 bg-white outline-none text-sm">
              <option>Date updated</option>
              <option>Title</option>
              <option>Recently viewed</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="container pb-6">{children}</div>
    </div>
  </div>
);

export default function Pipelines() {
  const { user }: any = useUserContext();
  const { toast } = useToast();
  const {
    data: UserPipelines,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['Pipeline'],
    queryFn: async () => {
      const { data } = await api.get('pipeline/getUserPipeline');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  console.log(UserPipelines);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex flex-col gap-4 justify-center items-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-xl font-semibold">Loading pipelines...</p>
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    // eslint-disable-next-line react/no-children-prop
    return <PageWrapper error children={undefined} />;
  }

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        await api.delete(`pipeline/deletePipeline/${id}`);
        toast({
          title: 'Pipeline deleted successfully!',
          variant: 'default',
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your pipeline has been deleted.',
          icon: 'success',
        });
      }
    } catch (error) {
      console.error('Error deleting pipeline:', error);
      toast({
        title: 'Error deleting pipeline',
        description:
          'There was an issue deleting the pipeline. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <PageWrapper>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {UserPipelines?.pipelines?.length > 0 ? (
          UserPipelines.pipelines.map((pipeline: Pipeline) => (
            <Card key={pipeline._id} className="flex flex-col">
              <CardHeader className="!p-0 max-h-[200px]">
                <FlowPreview pipelineId={pipeline._id} />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col gap-3">
                  <Link
                    className="hover:underline"
                    href={`/flow/${pipeline?._id}`}
                  >
                    <CardTitle className="text-lg">{pipeline.name}</CardTitle>
                  </Link>
                  <div className="flex items-center justify-between gap-3">
                    <p>{pipeline?.user?.username}</p>
                    <span>12/5/2025</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-4">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(pipeline._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl font-semibold">No pipelines available</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
