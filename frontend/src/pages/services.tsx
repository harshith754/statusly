import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../store";
import Sidebar from "../components/Sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { cn } from "../lib/utils";

const ServicesPage: React.FC = () => {
  const { slug } = useParams();
  const orgSlug = slug || "demo-org";
  const organization = useSelector((state: RootState) =>
    state.organizations.organizations.find((o) => o.slug === orgSlug)
  );
  if (!organization) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-zinc-400 text-lg">Organization not found.</div>
        </div>
      </div>
    );
  }
  const services = organization?.services || [];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4 text-zinc-100">
          Services ({orgSlug})
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className={cn("bg-zinc-900 border-zinc-800 text-zinc-100")}
            >
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "mt-2 px-2 py-1 rounded text-sm font-medium",
                    service.status === "Operational"
                      ? "bg-green-900 text-green-300"
                      : service.status === "Degraded Performance"
                      ? "bg-yellow-900 text-yellow-300"
                      : service.status === "Partial Outage"
                      ? "bg-orange-900 text-orange-300"
                      : "bg-red-900 text-red-300"
                  )}
                >
                  {service.status}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
