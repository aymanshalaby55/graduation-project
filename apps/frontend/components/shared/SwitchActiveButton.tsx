"use client";

import api from "@/app/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "../ui/switch";

type SwitchProps = {
  isActive: boolean;
  modelId: string;
};

const SwitchActiveButton = ({ modelId, isActive }: SwitchProps) => {
  const queryClient = useQueryClient();
  const { mutate: toggleActivity, isPending } = useMutation({
    mutationFn: async ({ isActive, modelId }: SwitchProps) => {
      await api.patch(`aiModels/update/${modelId}`, { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });

  const handleSwitchChange = (checked: boolean) => {
    toggleActivity({ modelId, isActive: checked });
  };

  return (
    <Switch
      disabled={isPending}
      checked={isActive}
      onCheckedChange={handleSwitchChange}
    />
  );
};

export default SwitchActiveButton;
