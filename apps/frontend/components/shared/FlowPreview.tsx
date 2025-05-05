import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import React from 'react';

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
    <div style={{ height: '70vh', position: 'relative'}}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={flowData.nodes ?? []}
          edges={flowData.edges ?? []}
          nodesDraggable={false}
          nodesConnectable={true}
          elementsSelectable={false}
          zoomOnScroll={true}
          panOnScroll={true}
          preventScrolling={false}
          panOnDrag={true}
          // onConnect={onConnect}
          // onDrop={onDrop}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
          // nodeTypes={nodeTypes}
        >
          <Controls />
          <Background />
          {/* <MiniMap /> */}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowPreview;
