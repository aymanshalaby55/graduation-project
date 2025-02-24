import { CirclePlus } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const UserProfileSidebar = () => {
  return (
    <div className="flex flex-col items-center shadow-lg h-[85vh] w-20 rounded-2xl bg-white">
      <div className="flex flex-col gap-4 mt-5">
        <Button className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center p-2">
          <CirclePlus size={24} />
        </Button>
        {/* Additional buttons can be added here if needed */}
      </div>
      <div className="mt-5">
        <Image
          width={50}
          height={50}
          alt="User Avatar"
          src="/images/avatar.png"
          className="rounded-full border-2 border-gray-300"
        />
      </div>
    </div>
  );
};

export default UserProfileSidebar;
