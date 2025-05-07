"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import Link from "next/link";
import FlowPreview from "@/components/shared/FlowPreview";
import api from "@/utils/api";

export default function CommunityPage() {
  const {
    data: allPipelines,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["Pipeline"],
    queryFn: async () => {
      const { data } = await api.get("pipeline/getAllPipelines");
      return data;
    },
    refetchOnWindowFocus: false,
  });

console.log("allPipelines", allPipelines);


  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-xl font-semibold">Loading pipelines...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <p className="text-xl font-semibold text-red-500">
          Error loading pipelines. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 bg-gray-100 dark:bg-secondary py-6">
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col gap-4 w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Pipeline Community
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore and discover pipelines shared by our community. Get
              inspired by how others organize their thoughts and ideas, or
              share your own creations to help others learn and grow.
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
            placeholder="Search for a pipeline"
          />
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 pb-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allPipelines?.pipelines?.length > 0 ? (
            allPipelines.pipelines.map((pipeline: any) => (
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
                      <span>
                        {pipeline?.createdAt?.split("T")[0] || "invalid"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-xl font-semibold">No pipelines available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
