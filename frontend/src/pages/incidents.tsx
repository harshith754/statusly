import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "@/components/Sidebar";
import NewIncidentCard from "@/components/incident-cards/NewIncidentCard";
import EditIncidentCard from "@/components/incident-cards/EditIncidentCard";
import IncidentCard from "@/components/incident-cards/IncidentCard";
import { Button } from "@/components/ui/button";
import { Plus, Save, X } from "lucide-react";
import {
  createOrgIncident,
  updateOrgIncident,
  deleteOrgIncident,
  createIncidentUpdate,
} from "@/slices/organizationsThunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { v4 as uuidv4 } from "uuid";
import type { OrgIncident, OrgIncidentStatus } from "@/types/organization";

const IncidentsPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug ?? "";

  const dispatch = useAppDispatch();

  const org = useSelector((state: any) =>
    state.organizations.organizations.find((o: any) => o.slug === slug)
  );

  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newStatus, setNewStatus] = useState<OrgIncidentStatus>("Ongoing");
  const [newAffectedServices, setNewAffectedServices] = useState<string[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState<OrgIncidentStatus>("Ongoing");

  const [updateIncidentId, setUpdateIncidentId] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState("");

  const handleAddIncident = () => {
    if (!newTitle.trim() || !newDesc.trim()) return;
    dispatch(
      createOrgIncident({
        slug,
        incident: {
          id: uuidv4(),
          title: newTitle,
          description: newDesc,
          status: newStatus,
          updates: [],
          affected_services: newAffectedServices,
        },
      })
    );
    setNewTitle("");
    setNewDesc("");
    setNewStatus("Ongoing");
    setNewAffectedServices([]);
    setAdding(false);
  };

  const handleEditIncident = (incident: OrgIncident) => {
    setEditingId(incident.id);
    setEditTitle(incident.title);
    setEditDesc(incident.description);
    setEditStatus(incident.status);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    const original = org?.incidents.find(
      (i: OrgIncident) => i.id === editingId
    );
    dispatch(
      updateOrgIncident({
        slug,
        incident: {
          id: editingId,
          title: editTitle,
          description: editDesc,
          status: editStatus,
          updates: original?.updates || [],
          affected_services: original?.affected_services || [],
        },
      })
    );
    setEditingId(null);
  };

  const handleDeleteIncident = (incidentId: string) => {
    dispatch(deleteOrgIncident({ slug, incidentId }));
  };

  const handleAddUpdate = (incidentId: string) => {
    setUpdateIncidentId(incidentId);
    setUpdateMessage("");
  };

  const handleSaveUpdate = () => {
    if (!updateIncidentId || !updateMessage.trim()) return;
    dispatch(
      createIncidentUpdate({
        slug,
        incidentId: updateIncidentId,
        update: {
          id: uuidv4(), // Use random UUID for id
          timestamp: new Date().toISOString(),
          message: updateMessage,
        },
      })
    );
    setUpdateIncidentId(null);
    setUpdateMessage("");
  };

  if (!org) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 text-zinc-100">Organization not found.</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 text-zinc-100">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Incidents</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setAdding((a) => !a)}
            className="ml-2 border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-100"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {adding && (
          <NewIncidentCard
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newDesc={newDesc}
            setNewDesc={setNewDesc}
            newStatus={newStatus}
            setNewStatus={setNewStatus}
            newAffectedServices={newAffectedServices}
            setNewAffectedServices={setNewAffectedServices}
            orgServices={org?.services || []}
            onAdd={handleAddIncident}
            onCancel={() => setAdding(false)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {org.incidents.length === 0 && (
            <div className="col-span-full text-center text-zinc-400">
              No incidents yet. Click <Plus className="inline w-4 h-4" /> to add
              one.
            </div>
          )}

          {org.incidents.map((incident: OrgIncident) =>
            editingId === incident.id ? (
              <EditIncidentCard
                key={incident.id}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editDesc={editDesc}
                setEditDesc={setEditDesc}
                editStatus={editStatus}
                setEditStatus={setEditStatus}
                onSave={handleSaveEdit}
                onCancel={() => setEditingId(null)}
              />
            ) : updateIncidentId === incident.id ? (
              <div
                key={incident.id}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col gap-3 shadow-lg"
              >
                <div className="mb-2 font-semibold text-lg">
                  {incident.title}
                </div>
                <textarea
                  className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded p-2"
                  rows={2}
                  placeholder="Update message"
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                />

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                    onClick={handleSaveUpdate}
                  >
                    <Save className="h-4 w-4" />
                    Save Update
                  </Button>
                  <Button
                    variant={"destructive"}
                    onClick={() => setUpdateIncidentId(null)}
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <IncidentCard
                key={incident.id}
                incident={incident}
                onEdit={() => handleEditIncident(incident)}
                onDelete={() => handleDeleteIncident(incident.id)}
                onAddUpdate={() => handleAddUpdate(incident.id)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentsPage;
