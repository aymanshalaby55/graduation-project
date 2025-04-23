"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/api";
import { Label } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { View } from "lucide-react";
import SwitchActiveButtonCont from "@/app/(dashboard)/dashboard/containers/components/SwitchActiveButtonCont";
import DeleteContainerButton from "@/app/(dashboard)/dashboard/containers/components/DeleteContainerButton";

const AdminContainers = () => {
  const { data: allContainer } = useQuery({
    queryKey: ["containers"],
    queryFn: async () => {
      const { data } = await api.get("http://localhost:9000/containers/list");
      return data;
    },
  });

  return (
    <div className="bg-gray-50 shadow-lg rounded-lg p-8">
      <h1 className="text-center font-bold text-3xl mb-8 text-gray-900">
        Containers Management
      </h1>
      <div className="grid grid-cols-4 gap-4 border-b border-gray-300 px-4 pb-4 mb-4 text-gray-700">
        <h2 className="font-semibold text-lg">Containers</h2>
        <h2 className="font-semibold text-lg">Images</h2>
        <h2 className="font-semibold text-lg">Status</h2>
        <h2 className="font-semibold text-lg text-right">Operations</h2>
      </div>
      {allContainer?.map((container: any) => (
        <div
          className="grid grid-cols-4 gap-4 border-b border-gray-200 py-4 px-4 items-center hover:bg-gray-100 transition-colors"
          key={container?.Id}
        >
          {/* Container Name */}
          <Label className="text-md text-gray-800">
            {container?.Names[0].replace("/", "")}
          </Label>
          {/* Image Name */}
          <Label className="text-md text-gray-800 truncate">
            {container?.Image}
          </Label>
          {/* Status */}
          <Label className={`text-md font-medium ${container?.State === "running" ? "text-green-600" : "text-red-600"}`}>
            {container?.State.charAt(0).toUpperCase() + container?.State.slice(1)}
          </Label>
          {/* Operations: View, Switch, and Delete Button */}
          <div className="flex justify-end items-center gap-4">
            <Link
              href={`https://hub.docker.com/repository/docker/ahmedwagih02/video-analysis/general`}
              className="text-gray-500 hover:text-gray-900"
            >
              <View className="h-5 w-5" />
            </Link>
            <SwitchActiveButtonCont
              containerId={container.Id}
              State={container.State === "running"}
            />
            <DeleteContainerButton containerId={container?.Id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminContainers;
