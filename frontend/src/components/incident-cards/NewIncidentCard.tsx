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
  <Card className="mb-8 bg-zinc-900 border-zinc-800 shadow-lg animate-in fade-in gap-4">
    <CardTitle className="px-6">Add an Incident</CardTitle>

    <CardContent className="flex flex-col md:flex-row gap-4 items-center">
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

export default NewIncidentCard;
