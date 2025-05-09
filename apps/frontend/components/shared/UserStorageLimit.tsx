/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserContext } from "@/context/UserContext";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const UserStorageLimit = () => {
  const { user }: any = useUserContext();
  const { data: userData } = useQuery({
    queryKey: ["userStorageLimit"],
    queryFn: async () => {
      const { data } = await api.get(`users/getUser/${user?.user?._id}`);
      return data;
    },
  });
  console.log(userData);
  return (
    <div className="absolute top-30 left-5 z-50 bg-secondary backdrop-blur-sm rounded-lg p-4 shadow-lg">
      <div className="text-sm font-medium">
        <h3 className="text-base font-bold mb-2">
          Storage Space Available :{" "}
          {(userData?.storageLimit / 1024 / 1024 / 1024).toFixed(2)} GB
        </h3>
      </div>
    </div>
  );
};

export default UserStorageLimit;
