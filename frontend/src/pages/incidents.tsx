import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "@/components/Sidebar";
import NewIncidentCard from "@/components/incident-cards/NewIncidentCard";
import EditIncidentCard from "@/components/incident-cards/EditIncidentCard";
import IncidentCard from "@/components/incident-cards/IncidentCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  addIncidentToOrg,
  updateIncidentInOrg,
  deleteIncidentInOrg,
  addIncidentUpdateToOrg,
  type OrgIncident,
  type OrgIncidentStatus,
} from "@/slices/organizationsSlice";

const IncidentsPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug ?? "";

  const dispatch = useDispatch();

  const org = useSelector((state: any) =>
    state.organizations.organizations.find((o: any) => o.slug === slug)
  );

  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newStatus, setNewStatus] = useState<OrgIncidentStatus>("Ongoing");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState<OrgIncidentStatus>("Ongoing");

  // For adding an update to an incident
  const [updateIncidentId, setUpdateIncidentId] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState("");

  const handleAddIncident = () => {
    if (!newTitle.trim() || !newDesc.trim()) return;
    dispatch(
      addIncidentToOrg({
        slug,
        incident: {
          id: Date.now().toString(),
          title: newTitle,
          description: newDesc,
          status: newStatus,
          updates: [],
          affectedServices: [],
        },
      })
    );
    setNewTitle("");
    setNewDesc("");
    setNewStatus("Ongoing");
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
    dispatch(
      updateIncidentInOrg({
        slug,
        incident: {
          id: editingId,
          title: editTitle,
          description: editDesc,
          status: editStatus,
          updates:
            org?.incidents.find((i: OrgIncident) => i.id === editingId)
              ?.updates || [],
          affectedServices:
            org?.incidents.find((i: OrgIncident) => i.id === editingId)
              ?.affectedServices || [],
        },
      })
    );
    setEditingId(null);
  };

  const handleDeleteIncident = (incidentId: string) => {
    dispatch({
      type: "organizations/deleteIncidentInOrg",
      payload: { slug, incidentId },
    });
  };

  const handleAddUpdate = (incidentId: string) => {
    setUpdateIncidentId(incidentId);
    setUpdateMessage("");
  };

  const handleSaveUpdate = () => {
    if (!updateIncidentId || !updateMessage.trim()) return;
    dispatch(
      addIncidentUpdateToOrg({
        slug,
        incidentId: updateIncidentId,
        update: {
          id: Date.now().toString(),
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
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    className="bg-blue-700 hover:bg-blue-600 text-white w-24"
                    onClick={handleSaveUpdate}
                  >
                    Save Update
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-zinc-300 w-24"
                    onClick={() => setUpdateIncidentId(null)}
                  >
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
