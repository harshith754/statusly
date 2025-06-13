import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { OrgServiceStatus } from "@/slices/organizationsSlice";

const STATUS_OPTIONS: { value: OrgServiceStatus; label: string }[] = [
  { value: "Operational", label: "Operational" },
  { value: "Degraded Performance", label: "Degraded Performance" },
  { value: "Partial Outage", label: "Partial Outage" },
  { value: "Major Outage", label: "Major Outage" },
];

interface NewServiceCardProps {
  newName: string;
  setNewName: (v: string) => void;
  newStatus: OrgServiceStatus;
  setNewStatus: (v: OrgServiceStatus) => void;
  onAdd: () => void;
  onCancel: () => void;
}

const NewServiceCard: React.FC<NewServiceCardProps> = ({
  newName,
  setNewName,
  newStatus,
  setNewStatus,
  onAdd,
  onCancel,
}) => (
  <Card className="mb-8 bg-zinc-900 border-zinc-800 shadow-lg animate-in fade-in gap-4">
    <CardTitle className="px-6">Add a Service</CardTitle>
    <CardContent className="flex flex-col md:flex-row gap-4 items-start">
      <Input
        className="bg-zinc-800 border-zinc-700 text-zinc-100"
        placeholder="Service Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Select
        value={newStatus}
        onValueChange={(v) => setNewStatus(v as OrgServiceStatus)}
      >
        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100 w-48">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        className="w-24 bg-green-700 hover:bg-green-600 text-white"
        onClick={onAdd}
      >
        Add
      </Button>
      <Button variant="destructive" className="w-24" onClick={onCancel}>
        Cancel
      </Button>
    </CardContent>
  </Card>
);

export default NewServiceCard;
