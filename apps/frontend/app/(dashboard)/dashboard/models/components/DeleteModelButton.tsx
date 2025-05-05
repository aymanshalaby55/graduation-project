"use client";

import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import api from "@/utils/api";

type ModelDelete = {
  modelId: string;
};

const DeleteModelButton = ({ modelId }: ModelDelete) => {
  const queryClient = useQueryClient();
  const { mutate: deleteModel, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await api.delete(`aiModels/delete/${modelId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
  return (
    <Button
      disabled={isPending}
      onClick={() => deleteModel()}
      variant="destructive"
    >
      <Trash2 />
    </Button>
  );
};

export default DeleteModelButton;
