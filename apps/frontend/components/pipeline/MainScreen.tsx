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
import { useDnD } from "@/app/context/DnDContext";
import "@/app/index.css";
import { Button } from "../ui/button";
import VideoUploaderNode from "./VideoUploaderNode";
import DropDownNode from "./DropDownNode";
import Sidebar from "./Sidebar";
import SavePipeline from "./SavePipeline";
import AnalizeButton from "./AnalizeButton";

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

  // Use useSearchParams to access the URL query parameters
  const searchParams = useSearchParams();
  const encodedFlow = searchParams.get("pipeline"); // Get the encoded pipeline data

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
        data: { label: `${type} node` },
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
          style={{ backgroundColor: "#F7F9FB" }}
          nodeTypes={nodeTypes}
        >
          {/* <MiniMap nodeStrokeColor="blue" nodeColor="lightblue" /> */}
          <Controls />
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
                <AnalizeButton />
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
