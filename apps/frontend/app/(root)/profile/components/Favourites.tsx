'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FlowPreview from '@/components/shared/FlowPreview';
import { useUserContext } from '@/context/UserContext';
import api from '@/utils/api';

export default function Favourites() {
  const { user }: any = useUserContext();

  const {
    data: FavPipelines,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['Pipeline'],
    queryFn: async () => {
      const { data } = await api.get('pipeline/getFavorites');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) {
    return (
      <div className="container mx-auto max-w-7xl px-4 p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-xl font-semibold">Loading pipelines...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 p-6 flex flex-col gap-6">
        <p className="text-xl font-semibold text-red-500">
          Error loading pipelines. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 p-6 flex flex-col gap-6">
      <div className="flex sm:items-center items-start flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
        <h1 className="text-2xl font-semibold">My Favorites Pipelines</h1>
        <Link href="/community">
          <Button variant={'secondary'} className="cursor-pointer">
            <span className="mr-1">+</span> Discover Community
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FavPipelines?.pipelines?.length > 0 ? (
          FavPipelines.pipelines.map((pipeline: any) => (
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
                      {pipeline?.createdAt?.split('T')[0] || 'invalid'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl font-semibold">
              No favorites pipelines available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
