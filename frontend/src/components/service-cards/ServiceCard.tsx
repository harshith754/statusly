import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Shield, Activity, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrgService } from "@/slices/organizationsSlice";

interface ServiceCardProps {
  service: OrgService;
  onEdit: () => void;
  onDelete: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onEdit,
  onDelete,
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Operational":
        return { 
          className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          icon: Shield
        };
      case "Degraded Performance":
        return { 
          className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
          icon: Activity
        };
      case "Partial Outage":
        return { 
          className: "bg-orange-500/10 text-orange-400 border-orange-500/20",
          icon: AlertTriangle
        };
      case "Major Outage":
        return { 
          className: "bg-red-500/10 text-red-400 border-red-500/20",
          icon: AlertTriangle
        };
      default:
        return { 
          className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
          icon: AlertCircle
        };
    }
  };

  const statusConfig = getStatusConfig(service.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900/70 transition-all duration-200 group gap-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-medium text-zinc-100 group-hover:text-white transition-colors">
            {service.name}
          </CardTitle>
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
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Badge
          className={cn(
            "inline-flex items-center gap-1.5 font-medium",
            statusConfig.className
          )}
        >
          <StatusIcon className="h-3 w-3" />
          {service.status}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;