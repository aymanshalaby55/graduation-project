// components/DropdownNode.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";

type DropdownNodeProps = {
  id: string;
  data: {
    label: string;
    onSelect: (id: string, value: string) => void;
  };
};

const DropdownNode: React.FC<DropdownNodeProps> = ({ id, data }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    console.log("DropdownNode rendered", id);
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newNodeId = `node_${Math.random()}`;
    data.onSelect(newNodeId, event.target.value);
    setSelectedOption(event.target.value);
  };

  return (
    <div className="w-full bg-gray-100 p-2 border rounded">
      <div>{data.label}</div>
      <select value={selectedOption} onChange={handleChange}>
        <option value="">Select an option</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
      </select>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="target" position={Position.Top} id="b" />
      <Handle type="source" position={Position.Right} id="add" />
    </div>
  );
};

export default DropdownNode;
