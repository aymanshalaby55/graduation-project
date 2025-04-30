"use client";

import React, { memo, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/api";
import { useVideoAnalysisContext } from "@/app/context/VideoAnalysisContext";

const DropDownNode = ({ data }: any) => {
  const { videoAnalysisData, setVideoAnalysisData }: any =
    useVideoAnalysisContext();
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const { data: allModels } = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const { data } = await api.get("models/user/getAllModels");
      return data;
    },
  });

  const handleModelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedModels.includes(selectedValue)) {
      const updatedModels = selectedModels.filter(
        (modelId) => modelId !== selectedValue
      );
      setSelectedModels(updatedModels);
      setVideoAnalysisData((prev: any) => ({
        ...prev,
        models: updatedModels,
      }));
    } else {
      const updatedModels = [...selectedModels, selectedValue];
      setSelectedModels(updatedModels);
      setVideoAnalysisData((prev: any) => ({
        ...prev,
        models: updatedModels,
      }));
    }
  };

  console.log(videoAnalysisData);

  return (
    <div className="flex flex-col gap-5 p-1 bg-white">
      <div>
        <select
          className="p-2 rounded-lg capitalize"
          onChange={handleModelSelect}
        >
          <option value="">Yolo Models</option>
          {allModels?.data?.aiModels.map((model: any) => (
            <option key={model._id} value={model._id}>
              {model.modelName}
            </option>
          ))}
        </select>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
};

export default memo(DropDownNode);
