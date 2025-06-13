import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Trash2,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrgIncident } from "@/types/organization";
import { SignedIn } from "@clerk/clerk-react";

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
}) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return {
          icon: CheckCircle2,
          className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        };
      case "investigating":
        return {
          icon: Activity,
          className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        };
      case "monitoring":
        return {
          icon: Clock,
          className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        };
      default:
        return {
          icon: AlertTriangle,
          className: "bg-red-500/10 text-red-400 border-red-500/20",
        };
    }
  };

  const statusConfig = getStatusConfig(incident.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="w-full max-w-none flex flex-col bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900/70 transition-all duration-200 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-lg text-zinc-100 group-hover:text-white transition-colors">
            {incident.title}
            <Badge
              className={cn(
                "inline-flex items-center gap-1.5 font-medium ml-5",
                statusConfig.className
              )}
            >
              <StatusIcon className="h-3 w-3" />
              {incident.status}
            </Badge>
          </CardTitle>

          <SignedIn>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                onClick={onEdit}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                onClick={onDelete}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </SignedIn>
        </div>
        {/* Status Badge */}
      </CardHeader>

      <CardContent className=" space-y-4">
        {/* Description */}
        <div className="text-sm text-zinc-300 leading-relaxed bg-zinc-800/30 rounded-lg p-3 border border-zinc-700/30">
          {incident.description}
        </div>

        {/* Action Button */}
        <SignedIn>
          <Button
            size="sm"
            className="flex items-center gap-2 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors duration-200"
            onClick={onAddUpdate}
          >
            <Plus className="w-4 h-4" />
            Add Update
          </Button>
        </SignedIn>

        {/* Updates Section */}
        {incident.updates.length > 0 && (
          <div className="space-y-3">
            <p className="text-base font-lg text-zinc-100 group-hover:text-white transition-colors">
              Updates ({incident.updates.length}):
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {incident.updates.map((update) => (
                <div
                  key={update.id}
                  className="bg-zinc-800/40 rounded-lg p-3 border border-zinc-700/20 hover:bg-zinc-800/60 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-zinc-500 rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-zinc-400 mb-1 font-medium">
                        {new Date(update.timestamp).toLocaleString()}
                      </div>
                      <p className="text-sm text-zinc-200 leading-relaxed">
                        {update.message}
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
};

export default IncidentCard;
