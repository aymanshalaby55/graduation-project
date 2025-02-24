import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface SelectSortingProps {
  setSortParam: Dispatch<SetStateAction<string>>;
}

const SelectSorting = ({ setSortParam }: SelectSortingProps) => {
  return (
    <div>
      <Select onValueChange={setSortParam}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By:" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="username">Username</SelectItem>
          <SelectItem value="role">Role</SelectItem>
          <SelectItem value="isPremium">Premium</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSorting;
