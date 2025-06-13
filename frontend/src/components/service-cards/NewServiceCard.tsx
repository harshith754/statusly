import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, Shield, Activity, AlertTriangle } from "lucide-react";
import type { OrgServiceStatus } from "@/slices/organizationsSlice";

const STATUS_OPTIONS: {
  value: OrgServiceStatus;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "Operational", label: "Operational", icon: Shield },
  {
    value: "Degraded Performance",
    label: "Degraded Performance",
    icon: Activity,
  },
  { value: "Partial Outage", label: "Partial Outage", icon: AlertTriangle },
  { value: "Major Outage", label: "Major Outage", icon: AlertTriangle },
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
}) => {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800/50 shadow-lg animate-in fade-in-50 duration-200 mb-6 gap-2">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-zinc-100 flex items-center gap-2">
          <Plus className="h-5 w-5 text-zinc-400" />
          Add New Service
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Service Name
            </label>
            <Input
              className="bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-zinc-600"
              placeholder="Enter service name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Status</label>
            <Select
              value={newStatus}
              onValueChange={(v) => setNewStatus(v as OrgServiceStatus)}
            >
              <SelectTrigger className="bg-zinc-800/50 border-zinc-700/50 text-zinc-100 focus:border-zinc-600 focus:ring-zinc-600">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {STATUS_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {opt.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            onClick={onAdd}
            disabled={!newName.trim()}
          >
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
          <Button variant="destructive" onClick={onCancel}>
            <X className="h-4 w-4" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewServiceCard;
