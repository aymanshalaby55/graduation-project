"use client";

import api from "@/app/utils/api";
import EditUserForm from "@/components/shared/EditUserForm";
import UserProfileSidebar from "@/components/shared/UserProfileSidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

interface UserInfoProps {
  _id: string;
  username: string;
  email: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
}

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();

  const { data: userInfo } = useQuery<UserInfoProps>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get(`/users/${id}`);
      return data;
    },
  });

  const formattedDate = userInfo?.dateOfBirth
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(userInfo.dateOfBirth))
    : "Date not available";

  return (
    <div className="min-h-screen p-5 lg:grid lg:grid-cols-5 lg:gap-6 container">
      <div className="lg:col-span-1 lg:min-h-screen">
        <UserProfileSidebar />
      </div>
      <div className="lg:col-span-4 lg:grid lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="shadow-lg rounded-lg p-5 bg-white">
            <EditUserForm
              username={userInfo?.username || ""}
              email={userInfo?.email || ""}
              dateOfBirth={formattedDate || ""}
              userId={id}
            />
          </div>
          <div className="shadow-lg rounded-lg p-5 bg-white">
            <h1 className="text-lg font-bold mb-3">Upgrade To Premium</h1>
            <p>Analyze unlimited videos with advanced models.</p>
            <Button variant="default" className="mt-4">
              Upgrade
            </Button>
          </div>
          <div className="shadow-lg rounded-lg p-5 bg-white">
            <h1 className="text-lg font-bold mb-3">Deactivate Your Account</h1>
            <p>Disable your account and stop all services immediately.</p>
            <Button variant="default" className="mt-4">
              Deactivate
            </Button>
          </div>
        </div>
        <div className="space-y-6 lg:col-span-1">
          <div className="shadow-lg rounded-lg p-5 bg-white">
            <h1 className="text-lg font-bold border-b pb-2">
              Connected Accounts
            </h1>
            <p className="p-2">
              You can edit and manage your connected accounts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between w-full h-24 p-3 border rounded bg-gray-100">
                <Image
                  src="/images/facebook.svg"
                  alt="facebook"
                  width={50}
                  height={50}
                />
                <Switch />
              </div>
              <div className="flex items-center justify-between w-full h-24 p-3 border rounded bg-gray-100">
                <Image
                  src="/images/google.svg"
                  alt="google"
                  width={50}
                  height={50}
                />
                <Switch />
              </div>
            </div>
          </div>
          <div className="shadow-lg rounded-lg p-5 bg-white">
            <h1 className="text-lg font-bold border-b pb-2">
              Two-Factor Authentication
            </h1>
            <p className="p-2">
              Enhance the security of your account with two-factor
              authentication.
            </p>
            <Button className="mt-3">Enable 2FA</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
