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
import type { OrgIncidentStatus } from "@/slices/organizationsSlice";

const STATUS_OPTIONS: { value: OrgIncidentStatus; label: string }[] = [
  { value: "Ongoing", label: "Ongoing" },
  { value: "Resolved", label: "Resolved" },
];

interface NewIncidentCardProps {
  newTitle: string;
  setNewTitle: (v: string) => void;
  newDesc: string;
  setNewDesc: (v: string) => void;
  newStatus: OrgIncidentStatus;
  setNewStatus: (v: OrgIncidentStatus) => void;
  onAdd: () => void;
  onCancel: () => void;
}

const NewIncidentCard: React.FC<NewIncidentCardProps> = ({
  newTitle,
  setNewTitle,
  newDesc,
  setNewDesc,
  newStatus,
  setNewStatus,
  onAdd,
  onCancel,
}) => (
  <Card className="mb-8 bg-zinc-900 border border-zinc-800 shadow-md">
    <CardTitle className="px-6 pt-4 text-zinc-200 text-base">
      Add an Incident
    </CardTitle>
    <CardContent className="flex flex-col md:flex-row gap-4 items-center p-6">
      <Input
        className="bg-zinc-800 border-zinc-700 text-zinc-100"
        placeholder="Incident Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <Input
        className="bg-zinc-800 border-zinc-700 text-zinc-100"
        placeholder="Description"
        value={newDesc}
        onChange={(e) => setNewDesc(e.target.value)}
      />
      <Select
        value={newStatus}
        onValueChange={(v) => setNewStatus(v as OrgIncidentStatus)}
      >
        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100 w-44">
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
        className="w-24 bg-zinc-700 hover:bg-zinc-600 text-white"
        onClick={onAdd}
      >
        Add
      </Button>
      <Button
        variant="ghost"
        className="w-24 text-zinc-400 hover:text-zinc-200"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </CardContent>
  </Card>
);

export default NewIncidentCard;
