"use client";

import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import VideoSelector from "./VideoSelector";

const VideoUploaderNode = ({ data }: any) => {
  const { data: userVideos } = useQuery({
    queryKey: ["userVideos"],
    queryFn: async () => {
      const { data } = await api.get(`videos/getUserVideos`);
      return data;
    },
  });

  return (
    <div>
      <VideoSelector videos={userVideos?.data?.userVideos} />
      {/* <VideoUploader /> */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(VideoUploaderNode);
