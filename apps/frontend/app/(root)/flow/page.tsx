import MainPipelineScreen from '@/components/Pipeline/MainScreen';
import { ReactFlowProvider } from '@xyflow/react';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReactFlowProvider>
        <div className="h-screen bg-black">
          <MainPipelineScreen />
        </div>
      </ReactFlowProvider>
    </Suspense>
  );
};

export default page;
