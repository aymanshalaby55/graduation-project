"use client";

// import { redirect } from "next/navigation";
// import { useUserContext } from "../../context/UserContext";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "@/app/context/DnDContext";

const Page = () => {
  // const { user }: any = useUserContext();
  // const loggedIn = !!user;
  // if (!loggedIn) {
  //   redirect("/");
  // }
  return (
    <>
      <h1>Videos</h1>
      {/* <ReactFlowProvider>
        <DnDProvider>
          <div className="flex flex-col gap-10">
            <div className="bg-black h-screen">
              <MainPipelineScreen />
            </div>
          </div>
        </DnDProvider>
      </ReactFlowProvider> */}
    </>
  );
};

export default Page;
