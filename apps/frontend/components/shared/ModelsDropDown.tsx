import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ModelsProps = {
  selectedValue: string;
  onChange: (newValue: string) => void;
};

const ModelsDropDown = ({ selectedValue, onChange }: ModelsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-3 border m-3">
        Choose The Model
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onChange("vDetection")}>
          Video Detection
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("fDetection")}>
          Fight Detection
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModelsDropDown;
