"use client";

import api from "@/app/utils/api";
import EditModelForm from "@/app/(dashboard)/dashboard/models/components/EditModelForm";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const EditModel = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: modelInfo,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["modelInfo"],
    queryFn: async () => {
      const { data } = await api.get(`aiModels/get/${id}`);
      return data;
    },
  });

  if (isLoading || isFetching) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div>
      <EditModelForm
        accuracy={modelInfo?.data?.aiModel?.accuracy}
        modelName={modelInfo?.data?.aiModel?.modelName}
        modelUrl={modelInfo?.data?.aiModel?.modelUrl}
        version={modelInfo?.data?.aiModel?.version}
        id={id}
      />
    </div>
  );
};

export default EditModel;
