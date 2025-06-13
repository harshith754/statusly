import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { OrgIncident } from "@/slices/organizationsSlice";

interface IncidentCardProps {
  incident: OrgIncident;
  onEdit: () => void;
  onDelete: () => void;
  onAddUpdate: () => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({
  incident,
  onEdit,
  onDelete,
  onAddUpdate,
}) => (
  <Card className="bg-zinc-900 border-zinc-800 shadow-md hover:shadow-xl transition-shadow">
    <CardContent className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-lg text-zinc-100">
          {incident.title}
        </span>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            incident.status === "Resolved"
              ? "bg-green-700 text-green-100"
              : "bg-yellow-700 text-yellow-100"
          }`}
        >
          {incident.status}
        </span>
      </div>
      <div className="text-sm text-zinc-400">{incident.description}</div>
      <div className="flex gap-2 mt-2">
        <Button
          size="sm"
          variant="secondary"
          className="text-zinc-100 bg-zinc-800 hover:bg-zinc-700"
          onClick={onEdit}
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="destructive" onClick={onDelete}>
          <Trash2 className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="text-zinc-100 bg-zinc-800 hover:bg-zinc-700"
          onClick={onAddUpdate}
        >
          + Update
        </Button>
      </div>
      <div className="mt-2">
        <div className="text-xs text-zinc-400 mb-1">Updates:</div>
        <ul className="space-y-1">
          {incident.updates.map((u) => (
            <li key={u.id} className="text-xs text-zinc-300">
              <span className="text-zinc-500 mr-2">
                {new Date(u.timestamp).toLocaleString()}
              </span>
              {u.message}
            </li>
          ))}
        </ul>
      </div>
    </CardContent>
  </Card>
);

export default IncidentCard;
