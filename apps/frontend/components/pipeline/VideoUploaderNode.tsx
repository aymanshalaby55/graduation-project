"use client";

import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { useQuery } from "@tanstack/react-query";
import VideoSelector from "./VideoSelector";
import api from "@/utils/api";

const VideoUploaderNode = ({ data, id }: any) => {
  const { data: userVideos } = useQuery({
    queryKey: ["userVideos"],
    queryFn: async () => {
      const { data } = await api.get(`videos/getUserVideos`);
      return data;
    },
  });

  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          data.onDelete(id);
        }}
        style={{
          position: "absolute",
          top: "-2px",
          right: "5px",
          cursor: "pointer",
          background: "transparent",
          border: "none",
          fontSize: "15px",
          color: "#ff0000",
        }}
      >
        ×
      </button>
      <VideoSelector videos={userVideos?.data?.userVideos} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(VideoUploaderNode);
