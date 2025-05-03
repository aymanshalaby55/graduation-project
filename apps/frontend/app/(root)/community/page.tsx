'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import api from '@/app/utils/api';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/app/context/UserContext';
import { useToast } from '@/components/ui/use-toast';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { ReactFlow, ReactFlowProvider, Background } from '@xyflow/react';
import LoadPipelineButton from '@/components/pipeline/LoadPipelineButton';
import { Search } from 'lucide-react';

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
      <div className="flex flex-col gap-4 bg-gray-100  py-6">
        <div className="flex items-center justify-center gap-4 ">
          <div className="flex flex-col gap-4 w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight ">
              Pipeline Community
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore and discover pipelines shared by our community. Get
              inspired by how others organize their thoughts and ideas, or share
              your own creations to help others learn and grow.
            </p>
          </div>
          <div className="">
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="h-2 bg-gray-200 rounded mb-3"></div>
              <div className="h-2 bg-blue-200 rounded mb-6"></div>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-[#4F46E5] rounded w-[50px] h-[50px]"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-3/4 justify-center mx-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="search"
            className="block w-full p-4 pl-10 text-sm border rounded-md bg-background border-input"
            placeholder="Search for a mind map"
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="container">{children}</div>
    </div>
  </div>
);

const FlowPreview = ({ pipelineId }: { pipelineId: string }) => {
  const {
    data: flowData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['PipelineFlow', pipelineId],
    queryFn: async () => {
      const { data } = await api.get(`pipeline/getPipeline/${pipelineId}`);
      return typeof data.flowData === 'string'
        ? JSON.parse(data.flowData)
        : data.flowData;
    },
  });

  if (isLoading) return <div>Loading preview...</div>;
  if (error || !flowData) return <div>Error loading preview</div>;

  return (
    <div style={{ height: '200px', width: '100%' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={flowData.nodes ?? []}
          edges={flowData.edges ?? []}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnScroll={false}
          preventScrolling={false}
          defaultViewport={flowData.viewport ?? { x: 0, y: 0, zoom: 1 }}
        >
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default function CommunityPage() {
  const { user }: any = useUserContext();
  const { toast } = useToast();
  const {
    data: allPipelines,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['Pipeline'],
    queryFn: async () => {
      const { data } = await api.get('pipeline/getAllPipelines');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  // console.log(allPipelines);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          {/* <p className="ml-4 text-xl font-semibold">Loading pipelines...</p> */}
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
          description: 'The pipeline has been removed from the community.',
          variant: 'default',
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {allPipelines?.pipelines?.length > 0 ? (
          allPipelines.pipelines.map((pipeline: Pipeline) => (
            <Card key={pipeline._id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Link href={`/profile/${pipeline.user.username}`}>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={`https://ui-avatars.com/api/?name=${pipeline.user.username}`}
                          alt={pipeline.user.username}
                        />
                        <AvatarFallback>
                          {pipeline.user.username?.slice(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{pipeline.name}</CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {pipeline.user.username}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-yellow-500 hover:text-yellow-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                    <span className="text-sm text-muted-foreground">
                      {/* {new Date(pipeline.createdAt).toLocaleDateString()} */}
                      {/* {pipeline.createdAt} */}
                      26/2/2025
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <FlowPreview pipelineId={pipeline._id} />
                {/* <p className="text-sm text-muted-foreground mt-4">
                  This pipeline is shared with the community. Click the button
                  below to load it into your workspace.
                </p> */}
              </CardContent>
              <CardFooter className="flex items-center gap-4">
                <LoadPipelineButton id={pipeline._id} />
                {pipeline.user.username === user?.username && (
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(pipeline._id)}
                  >
                    Delete
                  </Button>
                )}
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
