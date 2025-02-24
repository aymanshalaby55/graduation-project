"use client";

import api from "@/app/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "../ui/switch";

type SwitchProps = {
  containerId: string;
  State: boolean; // Boolean to represent the running state
};

const SwitchActiveButtonCont = ({ containerId, State }: SwitchProps) => {
  const queryClient = useQueryClient();

  const { mutate: toggleActivity, isPending } = useMutation({
    mutationFn: async ({ containerId, State }: SwitchProps) => {
      if (State) {
        // Start the container if the switch is turned on
        await api.get(`http://localhost:9000/containers/start/${containerId}`);
      } else {
        // Stop the container if the switch is turned off
        await api.get(`http://localhost:9000/containers/stop/${containerId}`);
      }
    },
    onSuccess: () => {
      // Refetch the container list after the action
      queryClient.invalidateQueries({ queryKey: ["containers"] });
    },
  });

  const handleSwitchChange = (checked: boolean) => {
    toggleActivity({ containerId, State: checked });
  };

  return (
    <Switch
      disabled={isPending}
      checked={State}
      onCheckedChange={handleSwitchChange}
    />
  );
};

export default SwitchActiveButtonCont;
