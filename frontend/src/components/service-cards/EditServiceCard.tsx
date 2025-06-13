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
import { Save, X, Edit3, Shield, Activity, AlertTriangle } from "lucide-react";
import type { OrgServiceStatus } from "@/types/organization";

const STATUS_OPTIONS: { value: OrgServiceStatus; label: string; icon: React.ElementType }[] = [
  { value: "Operational", label: "Operational", icon: Shield },
  { value: "Degraded Performance", label: "Degraded Performance", icon: Activity },
  { value: "Partial Outage", label: "Partial Outage", icon: AlertTriangle },
  { value: "Major Outage", label: "Major Outage", icon: AlertTriangle },
];

interface EditServiceCardProps {
  editName: string;
  setEditName: (v: string) => void;
  editStatus: OrgServiceStatus;
  setEditStatus: (v: OrgServiceStatus) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditServiceCard: React.FC<EditServiceCardProps> = ({
  editName,
  setEditName,
  editStatus,
  setEditStatus,
  onSave,
  onCancel,
}) => {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800/50 shadow-lg animate-in fade-in-50 duration-200 gap-2">
      <CardHeader>
        <CardTitle className="text-base font-medium text-zinc-100 flex items-center gap-2">
          <Edit3 className="h-4 w-4 text-zinc-400" />
          Edit Service
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Service Name</label>
            <Input
              className="bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-zinc-600"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Status</label>
            <Select
              value={editStatus}
              onValueChange={(v) => setEditStatus(v as OrgServiceStatus)}
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
          className="bg-green-800/80 hover:bg-green-900/80 text-green-100 font-medium px-3 py-2 h-auto min-w-[110px]"
            onClick={onSave}
            disabled={!editName.trim()}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
          <Button 
          className="bg-red-900/80 hover:bg-red-950/80 text-red-100 font-medium px-3 py-2 h-auto min-w-[90px]"

            onClick={onCancel}
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditServiceCard;