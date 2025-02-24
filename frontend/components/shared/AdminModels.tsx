"use client";
import { Label } from "../ui/label";
import AdminAddModelForm from "./AdminAddModelForm";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/utils/api";
import DeleteModelButton from "./DeleteModelButton";
import SwitchActiveButton from "./SwitchActiveButton";
import Link from "next/link";
import { View } from "lucide-react";
import { Button } from "../ui/button";

const AdminModels = () => {
  const { data: allModels } = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const { data } = await api.get("aiModels/admin/getAllModels");
      return data;
    },
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-center font-semibold text-2xl mb-4">
        Model Activation
      </h1>
      <div className="grid grid-cols-1 justify-between content-center p-5 gap-y-8">
        {allModels?.data?.aiModels.map((model: any) => {
          return (
            <div
              className=" flex justify-between border-b border-gray-300 p-4"
              key={model?._id}
            >
              <Label
                className="text-xl"
                htmlFor={model?.modelName.toLowerCase()}
              >
                {model?.modelName}
              </Label>
              <div className="flex flex-row gap-5 items-center">
                <Link href={`/dashboard/models/${model?._id}`}>
                  <View />
                </Link>
                <SwitchActiveButton
                  isActive={model?.isActive}
                  modelId={model?._id}
                />
                <DeleteModelButton modelId={model?._id} />
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <br />
      <hr />
      <div className="border p-5 rounded mt-10">
        <AdminAddModelForm />
      </div>
    </div>
  );
};

export default AdminModels;
