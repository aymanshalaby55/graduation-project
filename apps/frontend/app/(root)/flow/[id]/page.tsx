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

  useEffect(() => {
    const fetchPipeline = async () => {
      try {
        const response = await api.get(`pipeline/getPipeline/${id}`);
        setPipelineData(response.data);
      } catch (error) {
        console.error('Error fetching pipeline:', error);
      }
    };

    fetchPipeline();
  }, [id]);

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
              className="h-[40px] text-lg rounded-r-none cursor-pointer flex items-center justify-center p-2 gap-2"
              variant="outline"
            >
              <Star size={20} /> <span>Star</span>
            </Button>
            <div className="px-4 border h-[40px] flex items-center justify-center p-2 rounded-r-md">
              <p className="font-semibold">{0}</p>
            </div>
          </div>
          <LoadPipelineButton id={id} />
        </div>
      </div>
      <hr className="my-10" />
      {/* end of the header */}
      <FlowPreview pipelineId={id} />
    </div>
  );
};

export default Page;
