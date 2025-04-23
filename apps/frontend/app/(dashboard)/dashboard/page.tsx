"use client";

import { useUserContext } from "@/app/context/UserContext";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const { user }: any = useUserContext();
  if (user?.user?.role === "user") {
    redirect("/");
  }
  return <></>;
};

export default Dashboard;
