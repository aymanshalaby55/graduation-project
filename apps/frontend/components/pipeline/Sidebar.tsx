import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useDnD } from "@/context/DnDContext";

const Sidebar = () => {
  const [_, setType] = useDnD() || [];

  const onDragStart = (event: any, nodeType: any) => {
    if (setType) {
      setType(nodeType);
      event.dataTransfer.effectAllowed = "move";
    }
  };

  return (
    <aside className="flex flex-col h-screen bg-secondary text-white w-[250px] shrink-0 p-3 border-l-gray-300 border-1 dark:border-none">
      <div className="flex-1 overflow-y-auto">
        <div className="description text-md text-black dark:text-white p-4 ">
          You can choose whichever part of the pipeline you want to add.
        </div>
        <div
          className="dndnode input bg-gray-800 text-white p-4 m-2 rounded-lg hover:bg-gray-700 transition-colors cursor-move"
          onDragStart={(event) => onDragStart(event, "selectorNode")}
          draggable
        >
          <h1>Video Selector</h1>
        </div>
        <div
          className="dndnode bg-gray-800 text-white p-4 m-2 rounded-lg hover:bg-gray-700 transition-colors cursor-move"
          onDragStart={(event) => onDragStart(event, "yoloModels")}
          draggable
        >
          <h1>YOLO Models</h1>
        </div>
      </div>
      <div className="sticky bottom-0 border-gray-700 py-4 w-full border-t ">
        <Link href="/community">
          <Button className="bg-blue-600 hover:bg-blue-700 w-full text-white">
            Show Community Pipelines
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
