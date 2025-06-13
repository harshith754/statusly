import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
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
}) => (
  <Card className="bg-zinc-900 border-zinc-800 shadow-md hover:shadow-xl transition-shadow">
    <CardContent className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-lg text-zinc-100">
          {service.name}
        </span>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            service.status === "Operational"
              ? "bg-green-700 text-green-100"
              : service.status === "Degraded Performance"
              ? "bg-yellow-700 text-yellow-100"
              : service.status === "Partial Outage"
              ? "bg-orange-700 text-orange-100"
              : "bg-red-700 text-red-100"
          }`}
        >
          {service.status}
        </span>
      </div>
      <div className="flex gap-2 mt-4">
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
      </div>
    </CardContent>
  </Card>
);

export default ServiceCard;
