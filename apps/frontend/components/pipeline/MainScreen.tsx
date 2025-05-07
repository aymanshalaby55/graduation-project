// components/MainPipelineScreen.tsx
"use client";
import React, { useRef, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import {
  ReactFlow,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "@/app/index.css";
import { Button } from "../ui/button";
import VideoUploaderNode from "./VideoUploaderNode";
import DropDownNode from "./DropDownNode";
import Sidebar from "./Sidebar";
import SavePipeline from "./SavePipeline";
import AnalizeButton from "./AnalizeButton";
import { useVideoAnalysisContext } from "@/context/VideoAnalysisContext";
import { useDnD } from "@/context/DnDContext";
import { useTheme } from "next-themes";

const initialNodes: any[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const MainPipelineScreen = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const { toObject, setViewport } = useReactFlow();
  const nodeTypes: any = {
    selectorNode: VideoUploaderNode,
    yoloModels: DropDownNode,
  };

  const { theme } = useTheme();
  console.log(theme);

  // Use useSearchParams to access the URL query parameters
  const searchParams = useSearchParams();
  const encodedFlow = searchParams.get("pipeline"); // Get the encoded pipeline data

  const { socketStatus } = useVideoAnalysisContext();

  const pendingJobs = Object.values(socketStatus || {}).filter(
    (job) => job.status === "pending"
  );

  const completedJobs = Object.values(socketStatus || {}).filter(
    (job) => job.status === "completed"
  );

  const flow = toObject();
  const jsonFlow = JSON.stringify(flow, null, 2);

  const clearNodes = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((edges) => addEdge(params, edges)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { 
          label: `${type} node`,
          onDelete: handleDelete // Pass the handleDelete function to the node data
        },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes, type]
  );

  const handleLoadPipeline = useCallback(
    (savedFlow: any) => {
      if (!savedFlow) return;

      const viewport = savedFlow.viewport || {};
      const { x = 0, y = 0, zoom = 1 } = viewport;

      setNodes(savedFlow.nodes || []);
      setEdges(savedFlow.edges || []);
      setViewport({ x, y, zoom });
    },
    [setNodes, setEdges, setViewport]
  );

  const handleDelete = useCallback(
    (nodeId: string) => {
      setNodes((prevNodes) =>
        prevNodes.filter((node: any) => node.id !== nodeId)
      );
      setEdges((prevEdges) =>
        prevEdges.filter(
          (edge: any) => edge.source !== nodeId && edge.target !== nodeId
        )
      );
    },
    [setEdges, setNodes]
  );

  // Load the pipeline when the component mounts or the URL changes
  useEffect(() => {
    if (encodedFlow) {
      try {
        const decodedFlow = decodeURIComponent(encodedFlow); // Decode the pipeline data
        const savedFlow = JSON.parse(decodedFlow); // Parse the JSON string
        handleLoadPipeline(savedFlow); // Load the pipeline
      } catch (error) {
        console.error("Error parsing pipeline data:", error);
      }
    }
  }, [encodedFlow, handleLoadPipeline]);

  return (
    <div className="dndflow">
      <div
        className="reactflow-wrapper"
        style={{ height: "100vh", width: "100vw" }}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodeTypes={nodeTypes}
          style={{ backgroundColor: theme === "dark" ? "#1a1a1a" : "#F7F9FB" }}
        >
          <Controls />
          <div className="absolute top-5 left-5 z-50 bg-secondary backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="text-sm font-medium">
              <h3 className="text-base font-bold mb-2">Jobs Status</h3>
              {Object.entries(socketStatus || {}).map(
                ([id, job]: [string, any]) => (
                  <div key={id} className="mb-2 flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        job.status === "completed"
                          ? "bg-green-500"
                          : job.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                    />
                    <span>
                      Job {id}: {job.status}
                    </span>
                    {job.progress !== undefined && (
                      <span className="text-xs text-gray-600">
                        ({job.progress}%)
                      </span>
                    )}
                  </div>
                )
              )}
              {!socketStatus ||
                (Object.keys(socketStatus).length === 0 && (
                  <div className="text-gray-500">No active jobs</div>
                ))}
            </div>
          </div>
          <Background />
          {nodes.length > 0 && (
            <div className="relative h-screen">
              <div className="flex gap-4 flex-col absolute top-5 right-5">
                <Button
                  onClick={clearNodes}
                  className="z-50"
                  variant={"destructive"}
                >
                  Clear All Nodes
                </Button>
                <SavePipeline flowData={jsonFlow} />
              </div>

              <div className="absolute bottom-20 right-5 z-50">
                <AnalizeButton hasPendingJob={false} />
              </div>
            </div>
          )}
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
};

export default MainPipelineScreen;
