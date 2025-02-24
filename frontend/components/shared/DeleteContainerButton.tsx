"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/utils/api";

type ContainerDelete = {
  containerId: string;
};

const DeleteContainerButton = ({ containerId }: ContainerDelete) => {
  const queryClient = useQueryClient();

  const { mutate: deleteContainer, isPending } = useMutation({
    mutationFn: async () => {
      // API endpoint to delete the container by its ID
      await api.delete(`http://localhost:9000/containers/delete/${containerId}`);
    },
    onSuccess: () => {
      // Invalidate the query to refetch the container list after deletion
      queryClient.invalidateQueries({ queryKey: ["containers"] });
    },
  });

  return (
    <Button
      disabled={isPending}
      onClick={() => deleteContainer()}
      variant="destructive"
    >
      <Trash2 />
    </Button>
  );
};

export default DeleteContainerButton;
