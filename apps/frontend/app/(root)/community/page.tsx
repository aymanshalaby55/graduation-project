"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/api";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/app/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import Swal from "sweetalert2";
import Link from "next/link";
import { ReactFlow, ReactFlowProvider, Background } from "@xyflow/react";
import LoadPipelineButton from "@/components/pipeline/LoadPipelineButton";

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
  <div className="container py-8">
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Community Pipelines
        </h1>
        <p className={`text-muted-foreground ${error ? "text-red-500" : ""}`}>
          {error
            ? "Error loading pipelines. Please try again later."
            : "Discover and try out pipelines created by the community"}
        </p>
      </div>
      {children}
    </div>
  </div>
);

const FlowPreview = ({ pipelineId }: { pipelineId: string }) => {
  const {
    data: flowData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["PipelineFlow", pipelineId],
    queryFn: async () => {
      const { data } = await api.get(`pipeline/getPipeline/${pipelineId}`);
      return typeof data.flowData === "string"
        ? JSON.parse(data.flowData)
        : data.flowData;
    },
  });

  if (isLoading) return <div>Loading preview...</div>;
  if (error || !flowData) return <div>Error loading preview</div>;

  return (
    <div style={{ height: "200px", width: "100%" }}>
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
    queryKey: ["Pipeline"],
    queryFn: async () => {
      const { data } = await api.get("pipeline/getAllPipelines");
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
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await api.delete(`pipeline/deletePipeline/${id}`);
        toast({
          title: "Pipeline deleted successfully!",
          description: "The pipeline has been removed from the community.",
          variant: "default",
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting pipeline:", error);
      toast({
        title: "Error deleting pipeline",
        description:
          "There was an issue deleting the pipeline. Please try again.",
        variant: "destructive",
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
                  <span className="text-sm text-muted-foreground">
                    {/* {new Date(pipeline.createdAt).toLocaleDateString()} */}
                    {/* {pipeline.createdAt} */}
                    26/2/2025
                  </span>
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
