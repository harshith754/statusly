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
import type { OrgIncidentStatus } from "@/types/organization";

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
  <Card className="bg-zinc-900 border border-zinc-800 shadow-md">
    <CardContent className="p-6 space-y-5">
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-300">Title</label>
          <Input
            className="bg-zinc-800 border-zinc-700 text-zinc-100"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Enter incident title"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-300">
            Description
          </label>
          <Input
            className="bg-zinc-800 border-zinc-700 text-zinc-100"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Enter incident description"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-300">Status</label>
          <Select
            value={editStatus}
            onValueChange={(v) => setEditStatus(v as OrgIncidentStatus)}
          >
            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
          onClick={onSave}
          disabled={!editTitle.trim()}
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
        <Button variant={"destructive"} onClick={onCancel}>
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default EditIncidentCard;
