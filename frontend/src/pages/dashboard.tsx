import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Activity, Shield, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/Sidebar";

const DashboardPage: React.FC = () => {
  const { slug } = useParams();
  const orgSlug = slug || "demo-org";

  const organization = useSelector((state: RootState) =>
    state.organizations.organizations.find((o) => o.slug === orgSlug)
  );

  if (!organization) {
    return (
      <div className="flex min-h-screen bg-zinc-950">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <AlertCircle className="h-12 w-12 text-zinc-600 mx-auto" />
            <p className="text-zinc-400 text-lg font-medium">
              Organization not found
            </p>
            <p className="text-zinc-500 text-sm">
              Please check the URL and try again
            </p>
          </div>
        </div>
      </div>
    );
  }

  const services = organization?.services || [];
  const incidents = organization?.incidents || [];
  const hasMajorOutage = services.some((s) => s.status === "Major Outage");
  const activeIncidents = incidents.filter((i) => i.status === "Ongoing");

  // Calculate service statistics
  const operationalServices = services.filter(
    (s) => s.status === "Operational"
  ).length;
  const totalServices = services.length;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Operational":
        return {
          variant: "default" as const,
          className:
            "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20",
          icon: Shield,
        };
      case "Degraded Performance":
        return {
          variant: "secondary" as const,
          className:
            "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20",
          icon: Activity,
        };
      case "Partial Outage":
        return {
          variant: "destructive" as const,
          className:
            "bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20",
          icon: AlertTriangle,
        };
      case "Major Outage":
        return {
          variant: "destructive" as const,
          className:
            "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20",
          icon: AlertTriangle,
        };
      default:
        return {
          variant: "outline" as const,
          className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
          icon: AlertCircle,
        };
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />
      <div className="flex-1">
        <div className="border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/50">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
                  System Status
                </h1>
                <p className="text-sm text-zinc-400 mt-1">
                  {organization.name} • {operationalServices}/{totalServices}{" "}
                  services operational
                </p>
              </div>
              <div className="flex items-center gap-3">
                {hasMajorOutage ? (
                  <Badge className="bg-red-500/10 text-red-400 border-red-500/20">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    System Issues
                  </Badge>
                ) : (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    <Shield className="h-3 w-3 mr-1" />
                    All Systems Operational
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Active Incidents */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-zinc-200">
              Active Incidents
            </h2>
            {activeIncidents.length === 0 ? (
              <Card className="bg-zinc-900/50 border-zinc-800/50">
                <CardContent className="py-0">
                  <div className="flex items-center justify-center text-center space-y-2">
                    <div className="space-y-2">
                      <Shield className="h-8 w-8 text-emerald-500 mx-auto" />
                      <p className="text-sm font-medium text-zinc-300">
                        No active incidents
                      </p>
                      <p className="text-xs text-zinc-500">
                        All systems are running normally
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {activeIncidents.map((incident) => (
                  <Card
                    key={incident.id}
                    className="bg-zinc-900/50 border-zinc-800/50"
                  >
                    <CardContent className="py-0">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                        <div className="space-y-1 flex-1">
                          <h3 className="font-medium text-zinc-100">
                            {incident.title}
                          </h3>
                          <p className="text-sm text-zinc-400">
                            {incident.description}
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-orange-500/10 text-orange-400 border-orange-500/20 text-xs"
                          >
                            {incident.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Services Grid */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-zinc-200">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => {
                const statusConfig = getStatusConfig(service.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <Card
                    key={service.id}
                    className="bg-zinc-900/50 border-zinc-800/50 hover:bg-zinc-900/70 transition-colors group gap-2"
                  >
                    <CardHeader className="pb-0">
                      <CardTitle className="text-base font-medium text-zinc-100 group-hover:text-white transition-colors">
                        {service.name}
                      </CardTitle>
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
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
