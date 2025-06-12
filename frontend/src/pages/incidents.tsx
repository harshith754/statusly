import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { cn } from "../lib/utils";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "@/store";
import Sidebar from "../components/Sidebar";

const IncidentsPage: React.FC = () => {
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
  const incidents = organization?.incidents || [];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4 text-zinc-100">
            Incidents for {orgSlug}
          </h1>
          <div>
            {incidents.length === 0 ? (
              <div className="text-zinc-400">No incidents reported.</div>
            ) : (
              <ul>
                {incidents.map((inc) => (
                  <Card
                    key={inc.id}
                    className={cn(
                      "bg-zinc-900 border-zinc-800 text-zinc-100 mb-4"
                    )}
                  >
                    <CardHeader>
                      <CardTitle>{inc.title}</CardTitle>
                      <div className="text-gray-400 text-sm mb-1">
                        {inc.status}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div>{inc.description}</div>
                      <div className="mt-2">
                        <span className="font-medium">Updates:</span>
                        <ul className="ml-4 list-disc">
                          {inc.updates.map((u) => (
                            <li key={u.id} className="text-xs text-gray-500">
                              {u.timestamp}: {u.message}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentsPage;
