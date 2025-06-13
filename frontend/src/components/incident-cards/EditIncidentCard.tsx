import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Save, X } from "lucide-react";
import type { OrgIncidentStatus } from "@/slices/organizationsSlice";

const STATUS_OPTIONS: { value: OrgIncidentStatus; label: string }[] = [
  { value: "Ongoing", label: "Ongoing" },
  { value: "Resolved", label: "Resolved" },
];

interface EditIncidentCardProps {
  editTitle: string;
  setEditTitle: (v: string) => void;
  editDesc: string;
  setEditDesc: (v: string) => void;
  editStatus: OrgIncidentStatus;
  setEditStatus: (v: OrgIncidentStatus) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditIncidentCard: React.FC<EditIncidentCardProps> = ({
  editTitle,
  setEditTitle,
  editDesc,
  setEditDesc,
  editStatus,
  setEditStatus,
  onSave,
  onCancel,
}) => (
  <Card className="bg-zinc-900 border-zinc-800 shadow-lg animate-in fade-in">
    <CardContent className="flex flex-col gap-3">
      <Input
        className="bg-zinc-800 border-zinc-700 text-zinc-100"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="Incident Title"
      />
      <Input
        className="bg-zinc-800 border-zinc-700 text-zinc-100"
        value={editDesc}
        onChange={(e) => setEditDesc(e.target.value)}
        placeholder="Description"
      />
      <Select
        value={editStatus}
        onValueChange={(v) => setEditStatus(v as OrgIncidentStatus)}
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
      <div className="flex gap-2 mt-4">
        <Button
          size="sm"
          className="bg-green-700 hover:bg-green-600 text-white w-24"
          onClick={onSave}
        >
          <Save className="w-4 h-4 mr-1" /> Save
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-zinc-300 w-24"
          onClick={onCancel}
        >
          <X className="w-4 h-4 mr-1" /> Cancel
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default EditIncidentCard;
