import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, Clock } from "lucide-react";
import type { OrgIncident } from "@/types/organization";

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
  <Card className="inline-block bg-zinc-900/50 border border-zinc-800/50 shadow-lg hover:bg-zinc-900/70 transition-colors py-0">
    <div className="flex items-center justify-between px-6 pt-5 pb-2">
      <CardTitle className="text-slate-100 text-lg font-semibold">
        {incident.title}
      </CardTitle>
      <span
        className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-sm ${
          incident.status === "Resolved"
            ? "bg-emerald-600/90 text-emerald-100 shadow-emerald-500/20"
            : "bg-amber-600/90 text-amber-100 shadow-amber-500/20"
        }`}
      >
        {incident.status}
      </span>
    </div>

    <CardContent className="p-6 space-y-5 pt-2">
      {/* Description */}
      <div className="text-sm text-slate-300 leading-relaxed bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
        {incident.description}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="flex items-center gap-2 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors duration-200 px-3 py-1 rounded"
            onClick={onEdit}
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Button>

          <Button
            size="sm"
            className="flex items-center gap-2 bg-slate-800 text-slate-200 hover:bg-red-700 hover:text-white transition-colors duration-200 px-3 py-1 rounded"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>

        <Button
          size="sm"
          className="flex items-center gap-2 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors duration-200 px-3 py-1 rounded"
          onClick={onAddUpdate}
        >
          <Plus className="w-4 h-4" />
          Add Update
        </Button>
      </div>

      {/* Updates Section */}
      {incident.updates.length > 0 && (
        <div className="pt-4 border-t border-slate-700/30">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">
              Updates ({incident.updates.length})
            </span>
          </div>
          <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-1">
            {incident.updates.map((u) => (
              <div
                key={u.id}
                className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/20 hover:bg-slate-800/60 transition-colors duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-slate-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-400 mb-1 font-medium">
                      {new Date(u.timestamp).toLocaleString()}
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {u.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

export default IncidentCard;
