"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrgIncident, OrgIncidentStatus } from "@/types/organization";
import { AlertCircle, CheckCircle, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

function getAllTimelineEvents(incidents: OrgIncident[]) {
  const allEvents: Array<{
    id: string;
    incidentId: string;
    incidentTitle: string;
    incidentStatus: OrgIncidentStatus;
    timestamp: string;
    type: "update";
    content: string;
    affectedServices: string[];
  }> = [];

  incidents.forEach((incident) => {
    // Add all updates
    incident.updates.forEach((update) => {
      allEvents.push({
        id: update.id,
        incidentId: incident.id,
        incidentTitle: incident.title,
        incidentStatus: incident.status,
        timestamp: update.timestamp,
        type: "update",
        content: update.message,
        affectedServices: incident.affected_services,
      });
    });
  });

  // Sort all events by timestamp (newest first)
  return allEvents.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

function formatTimestamp(timestamp: string) {
  return new Date(timestamp).toLocaleString();
}

function getEventIcon(status: OrgIncidentStatus) {
  switch (status) {
    case "Ongoing":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case "Resolved":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    default:
      return <MessageSquare className="h-5 w-5 text-blue-500" />;
  }
}

function getStatusBadgeColor(status: OrgIncidentStatus) {
  switch (status) {
    case "Resolved":
      return "bg-green-900 text-green-200 border border-green-700";
    case "Ongoing":
      return "bg-red-900 text-red-200 border border-red-700";
    default:
      return "bg-zinc-800 text-zinc-200 border border-zinc-600";
  }
}

export default function IncidentTimeline() {
  const [statusFilter, setStatusFilter] = useState<
    "all" | "Ongoing" | "Resolved"
  >("all");
  const incidents = useSelector((state: RootState) => {
    const org = state.organizations.organizations[0];
    return org ? org.incidents : [];
  });
  const filteredIncidents =
    statusFilter === "all"
      ? incidents
      : incidents.filter((i) => i.status === statusFilter);
  const timelineEvents = getAllTimelineEvents(filteredIncidents);

  return (
    <div className="w-full mx-auto p-0 min-h-0 bg-transparent">
      <Card className="mb-4 bg-zinc-900/60 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-base text-zinc-100 font-semibold">
            Incident Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge
              variant={statusFilter === "all" ? "default" : "outline"}
              className={`cursor-pointer text-xs px-2 py-1 ${
                statusFilter === "all"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-zinc-800 text-zinc-200 border-zinc-600 hover:bg-zinc-700"
              }`}
              onClick={() => setStatusFilter("all")}
            >
              All
            </Badge>
            <Badge
              variant={statusFilter === "Ongoing" ? "default" : "outline"}
              className={`cursor-pointer text-xs px-2 py-1 ${
                statusFilter === "Ongoing"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-zinc-800 text-zinc-200 border-zinc-600 hover:bg-zinc-700"
              }`}
              onClick={() => setStatusFilter("Ongoing")}
            >
              Ongoing
            </Badge>
            <Badge
              variant={statusFilter === "Resolved" ? "default" : "outline"}
              className={`cursor-pointer text-xs px-2 py-1 ${
                statusFilter === "Resolved"
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-zinc-800 text-zinc-200 border-zinc-600 hover:bg-zinc-700"
              }`}
              onClick={() => setStatusFilter("Resolved")}
            >
              Resolved
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-zinc-700"></div>

        {/* Timeline events */}
        <div className="space-y-4">
          {timelineEvents.map((event) => (
            <div key={event.id} className="relative pl-12">
              {/* Timeline dot */}
              <div className="absolute left-0 p-1 bg-zinc-900 rounded-full border-4 border-zinc-700">
                {getEventIcon(event.incidentStatus)}
              </div>

              <Card className="bg-zinc-900/60 border-zinc-800">
                <CardHeader className="pb-1">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-xs text-zinc-400 mb-0.5">
                        {formatTimestamp(event.timestamp)}
                      </p>
                      <CardTitle className="text-sm text-zinc-100 font-medium">
                        {event.incidentTitle}
                      </CardTitle>
                      {event.affectedServices.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {event.affectedServices.map((service) => (
                            <Badge
                              key={service}
                              variant="outline"
                              className="text-[10px] bg-zinc-800 text-zinc-300 border-zinc-700 px-1.5 py-0.5"
                            >
                              Service {service}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <span
                      className={`text-[10px] px-2 py-1 rounded-full ${getStatusBadgeColor(
                        event.incidentStatus
                      )}`}
                    >
                      {event.incidentStatus}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {event.content}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {timelineEvents.length === 0 && (
          <Card className="bg-zinc-900/60 border-zinc-800 text-center py-8">
            <CardContent>
              <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
              <h3 className="text-base font-semibold mb-1 text-zinc-100">
                No Incidents Found
              </h3>
              <p className="text-xs text-zinc-400">
                No incidents match the current filter
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
