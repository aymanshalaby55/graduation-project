"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "@/app/utils/api";

interface Pipeline {
  flowData: string;
  name: string;
}

const SavePipeline = ({ flowData }: { flowData: string }) => {
  const [name, setName] = useState<string>("");

  const { mutate: savePipeline, isPending } = useMutation({
    mutationFn: async (pipelineData: Pipeline) => {
      const { data } = await api.post(`pipeline/createPipeline`, pipelineData);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="z-50" variant={"default"}>
          Save Pipeline
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Pipeline</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="title"
              placeholder="Enter pipeline title"
            />
          </div>
          <Button
            onClick={() => savePipeline({ flowData, name })}
            className="w-full"
            disabled={isPending}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavePipeline;
