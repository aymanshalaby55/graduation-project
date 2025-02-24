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
import LoadPipelineButton from "@/components/Pipeline/LoadPipelineButton";

interface Pipeline {
  _id: string;
  name: string;
  user: {
    username: string;
  };
  createdAt: Date;
}

const PageWrapper = ({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: boolean;
}) => (
  <div className="container mx-auto px-4 py-8">
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

export default function CommunityPage() {
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

  console.log(allPipelines);

  if (isLoading) {
    return <PageWrapper>Loading pipelines...</PageWrapper>;
  }

  if (error) {
    // eslint-disable-next-line react/no-children-prop
    return <PageWrapper error children={undefined} />;
  }

  return (
    <PageWrapper>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allPipelines?.pipelines?.map((pipeline: Pipeline) => (
          <Card key={pipeline._id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${pipeline.user.username}`}
                    alt={pipeline.user.username}
                  />
                  <AvatarFallback>
                    {pipeline.user.username?.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <CardTitle className="text-lg">{pipeline.name}</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {pipeline.user.username}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This pipeline is shared with the community. Click the button
                below to load it into your workspace.
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between mt-auto">
              <LoadPipelineButton id={pipeline._id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
