'use client';

import api from '@/app/utils/api';
import LoadPipelineButton from '@/components/pipeline/LoadPipelineButton';
import FlowPreview from '@/components/shared/FlowPreview';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const { id } = useParams();
  const [pipelineData, setPipelineData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    const fetchPipeline = async () => {
      try {
        const response = await api.get(`pipeline/getPipeline/${id}`);
        const data = response.data;
        setPipelineData(data);
        setIsFavorite(data.isFavorite || false);
        setStarCount(data.starCount || 0);
      } catch (error) {
        console.error('Error fetching pipeline:', error);
      }
    };

    fetchPipeline();
  }, [id]);

  const handleToggleFavorite = async () => {
    try {
      const newFavorite = !isFavorite;
      const response = await api.put(`/pipeline/toggleFavorite/${id}`, {
        isFavorite: newFavorite,
      });

      setIsFavorite(response.data.isFavorite);
      setStarCount(response.data.starCount);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }

  console.log(pipelineData);

  return (
    <div className="mx-auto container p-10">
      {/* start of the header */}
      <div className="flex justify-between gap-2">
        <div className="flex-grow">
          <p className="opacity-50">Pipeline for</p>
          <h1 className="text-2xl font-semibold">{pipelineData?.name}</h1>
          <p>
            {' '}
            {/* {diagramData.result.fullName}: {diagramData.result.description} */}
          </p>
        </div>
        <div className="flex flex-row gap-5 h-[40px]">
          <div className="flex flex-row">
            <Button
              className={`h-[40px] text-lg rounded-r-none cursor-pointer flex items-center justify-center p-2 gap-2 hover:bg-none ${
                isFavorite ? 'text-yellow-500' : ''
              }`}
              variant="outline"
              onClick={handleToggleFavorite}
            >
              <Star size={20} fill={isFavorite ? '#facc15' : 'none'} />
              <span>Star</span>
            </Button>
            <div className="px-4 border h-[40px] flex items-center justify-center p-2 rounded-r-md">
            <span>{pipelineData?.starredBy?.length || 0}</span>
            </div>
          </div>
          <LoadPipelineButton id={id.toString()} />
        </div>
      </div>
      <hr className="my-10" />
      {/* end of the header */}
      <FlowPreview pipelineId={id.toString()} />
    </div>
  );
};

export default Page;
