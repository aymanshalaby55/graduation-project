import { useDnD } from '@/app/context/DnDContext';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const Sidebar = () => {
  const [_, setType] = useDnD() || [];

  const onDragStart = (event: any, nodeType: any) => {
    if (setType) {
      setType(nodeType);
      event.dataTransfer.effectAllowed = 'move';
    }
  };

  return (
    <aside className="flex flex-col h-screen">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="description text-md">
          You can choose whichever part of the pipeline you want to add.
        </div>
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, 'selectorNode')}
          draggable
        >
          <h1>Video Selector</h1>
        </div>
        <div
          className="dndnode bg-white"
          onDragStart={(event) => onDragStart(event, 'yoloModels')}
          draggable
        >
          <h1>YOLO Models</h1>
        </div>
        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, 'analyzeButton')}
          draggable
        >
          Analyze Button
        </div>
      </div>

      {/* Button at the bottom */}
      <div className="sticky bottom-0 border-[#000] py-4 w-full border-t bg-white">
        <Link href="/community">
          <Button className="bg-blue-800 hover:bg-blue-900 w-full">
            Show Community Pipelines
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;