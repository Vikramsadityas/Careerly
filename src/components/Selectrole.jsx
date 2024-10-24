import { Select, SelectItem } from "@nextui-org/react";
import RoleData from "./data.json";

export default function SelectRole() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select label="Select a job role" className="max-w-xs">
        {RoleData.map((role) => (
          <SelectItem key={role.key}>
            {role.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}