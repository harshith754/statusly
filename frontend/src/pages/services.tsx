import React, { useState } from "react";
import { useActionData, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "@/components/Sidebar";
import NewServiceCard from "@/components/service-cards/NewServiceCard";
import EditServiceCard from "@/components/service-cards/EditServiceCard";
import ServiceCard from "@/components/service-cards/ServiceCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  createOrgService,
  updateOrgService,
  deleteOrgService,
} from "@/slices/organizationsThunks";
import type { OrgService, OrgServiceStatus } from "@/types/organization";
import { useAppDispatch } from "@/hooks/useAppDispatch";


const ServicesPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug ?? "";

  const dispatch = useAppDispatch();

  const org = useSelector((state: any) =>
    state.organizations.organizations.find((o: any) => o.slug === slug)
  );

  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState<OrgServiceStatus>("Operational");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState<OrgServiceStatus>("Operational");

  const handleAddService = () => {
    if (!newName.trim()) return;
    dispatch(
      createOrgService({
        slug,
        service: {
          id: Date.now().toString(),
          name: newName,
          status: newStatus,
        },
      })
    );
    setNewName("");
    setNewStatus("Operational");
    setAdding(false);
  };

  const handleEditService = (service: OrgService) => {
    setEditingId(service.id);
    setEditName(service.name);
    setEditStatus(service.status);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    dispatch(
      updateOrgService({
        slug,
        service: {
          id: editingId,
          name: editName,
          status: editStatus,
        },
      })
    );
    setEditingId(null);
  };

  const handleDeleteService = (serviceId: string) => {
    dispatch(
      deleteOrgService({
        slug,
        serviceId,
      })
    );
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
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
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
          <NewServiceCard
            newName={newName}
            setNewName={setNewName}
            newStatus={newStatus}
            setNewStatus={setNewStatus}
            onAdd={handleAddService}
            onCancel={() => setAdding(false)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {org.services.length === 0 && (
            <div className="col-span-full text-center text-zinc-400">
              No services yet. Click <Plus className="inline w-4 h-4" /> to add
              one.
            </div>
          )}

          {org.services.map((service: OrgService) =>
            editingId === service.id ? (
              <EditServiceCard
                key={service.id}
                editName={editName}
                setEditName={setEditName}
                editStatus={editStatus}
                setEditStatus={setEditStatus}
                onSave={handleSaveEdit}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <ServiceCard
                key={service.id}
                  service={service}
                  incidents={org.incidents} 
                onEdit={() => handleEditService(service)}
                onDelete={() => handleDeleteService(service.id)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
