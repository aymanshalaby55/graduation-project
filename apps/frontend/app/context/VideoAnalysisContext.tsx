"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// Define more specific types for better type safety
interface SocketJobStatus {
  status: "pending" | "in-progress" | "completed" | "error";
  progress?: number;
  phase?: string;
  result?: any;
  modelResult?: any;
  error?: string;
}

interface VideoAnalysisContextType {
  videoAnalysisData: {
    videos: string[];
    models: string[];
  };
  setVideoAnalysisData: React.Dispatch<
    React.SetStateAction<{
      videos: string[];
      models: string[];
    }>
  >;
  socketStatus: {
    [jobId: string]: SocketJobStatus;
  };
  clearSocketStatus: () => void; // Add this line
}

const VideoAnalysisContext = createContext<VideoAnalysisContextType>({
  videoAnalysisData: { videos: [], models: [] },
  setVideoAnalysisData: () => {},
  socketStatus: {},
  clearSocketStatus: () => {}, // Add this line
});

const VideoAnalysisProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoAnalysisData, setVideoAnalysisData] = useState<{
    videos: string[];
    models: string[];
  }>({
    videos: [],
    models: [],
  });
  const [socketStatus, setSocketStatus] = useState<{
    [jobId: string]: SocketJobStatus;
  }>({});
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create socket connection; adjust URL as needed
    const newSocket = io("http://localhost:4040", {
      transports: ["websocket"],
      reconnection: true,
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected with ID:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    newSocket.on("analysisStarted", (data) => {
      console.log("Analysis started:", data);
      setSocketStatus((prev) => ({
        ...prev,
        [String(data.jobId)]: {
          status: "pending",
          progress: 0,
        },
      }));
    });

    newSocket.on("analysisProgress", ({ jobId, progress, phase }) => {
      console.log("Analysis progress:", jobId, progress, phase);
      setSocketStatus((prev) => ({
        ...prev,
        [String(jobId)]: {
          status: "in-progress",
          progress,
          phase,
        },
      }));
    });

    newSocket.on("analysisComplete", ({ jobId, result, modelResult }) => {
      console.log("Analysis complete:", jobId, result, modelResult);
      setSocketStatus((prev) => ({
        ...prev,
        [String(jobId)]: {
          status: "completed",
          progress: 100,
          result,
          modelResult,
        },
      }));
    });

    newSocket.on("analysisError", ({ jobId, error }) => {
      console.error("Analysis error:", jobId, error);
      setSocketStatus((prev) => ({
        ...prev,
        [String(jobId)]: {
          status: "error",
          error,
        },
      }));
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const clearSocketStatus = () => {
    setSocketStatus({});
  };

  return (
    <VideoAnalysisContext.Provider
      value={{
        videoAnalysisData,
        setVideoAnalysisData,
        socketStatus,
        clearSocketStatus,
      }}
    >
      {children}
    </VideoAnalysisContext.Provider>
  );
};

const useVideoAnalysisContext = () => {
  const context = useContext(VideoAnalysisContext);
  if (context === undefined) {
    throw new Error(
      "useVideoAnalysisContext must be used within a VideoAnalysisProvider"
    );
  }
  return context;
};

export { VideoAnalysisProvider, useVideoAnalysisContext };
