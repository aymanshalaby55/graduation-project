"use client";
import React, { Suspense } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { redirect } from "next/navigation";
import { useUserContext } from "../../context/UserContext";
import { DnDProvider } from "@/app/context/DnDContext";
import MainPipelineScreen from "@/components/Pipeline/MainScreen";
// import MainPipelineScreen from "@/components/pipeline/MainScreen";
const Page = () => {
  const { user }: any = useUserContext();
  const loggedIn = !!user;
  if (!loggedIn) {
    redirect("/");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReactFlowProvider>
        <DnDProvider>
          <div className="flex flex-col gap-10">
            <div className="bg-black h-screen">
              <MainPipelineScreen />
            </div>
          </div>
        </DnDProvider>
      </ReactFlowProvider>
    </Suspense>
  );
};

export default Page;
