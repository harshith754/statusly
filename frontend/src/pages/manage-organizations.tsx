import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  createOrganization as createOrganizationThunk,
  updateOrganization as updateOrganizationThunk,
  deleteOrganization as deleteOrganizationThunk,
} from "@/slices/organizationsThunks";
import type { RootState } from "@/store";
import type { Organization } from "@/types/organization";
import { Pencil, Trash2 } from "lucide-react";

const ManageOrganizations: React.FC = () => {
  const dispatch = useAppDispatch();
  const organizations = useSelector(
    (state: RootState) => state.organizations.organizations
  );
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgSlug, setNewOrgSlug] = useState("");
  const [editOrgId, setEditOrgId] = useState<string | null>(null);
  const [editOrgName, setEditOrgName] = useState("");
  const [editOrgSlug, setEditOrgSlug] = useState("");
  const [loading, setLoading] = useState(false);

  async function createOrganization() {
    setLoading(true);
    await dispatch(
      createOrganizationThunk({ name: newOrgName, slug: newOrgSlug })
    );
    setNewOrgName("");
    setNewOrgSlug("");
    setLoading(false);
  }

  async function updateOrganization(orgId: string) {
    setLoading(true);
    await dispatch(
      updateOrganizationThunk({
        id: orgId,
        name: editOrgName,
        slug: editOrgSlug,
      })
    );
    setEditOrgId(null);
    setEditOrgName("");
    setEditOrgSlug("");
    setLoading(false);
  }

  async function deleteOrganization(orgId: string) {
    setLoading(true);
    await dispatch(deleteOrganizationThunk({ id: orgId }));
    setLoading(false);
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Manage Organizations</h1>
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">
            Create New Organization
          </h2>
          <div className="flex gap-2 items-center">
            <Input
              className="w-48 border-zinc-800"
              placeholder="Organization Name"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              disabled={loading}
            />
            <Input
              className="w-48 border-zinc-800"
              placeholder="Slug (unique)"
              value={newOrgSlug}
              onChange={(e) => setNewOrgSlug(e.target.value)}
              disabled={loading}
            />
            <Button
              size="sm"
              className="px-3 py-1 text-xs bg-gray-800 text-white hover:bg-gray-700 hover:text-white border border-gray-700 hover:border-gray-500 transition duration-200"
              onClick={createOrganization}
              disabled={loading || !newOrgName.trim() || !newOrgSlug.trim()}
            >
              {(loading || !newOrgName.trim() || !newOrgSlug.trim()) ? "Invalid":"Create"} 
            </Button>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">All Organizations</h2>
          <ul className="space-y-2">
            {organizations.map((org: Organization) => (
              <Card
                key={org.slug}
                className="bg-zinc-900 border border-zinc-800 py-0"
              >
                <CardContent className="p-3 flex items-center gap-4">
                  {editOrgId === org.slug ? (
                    <>
                      <Input
                        className="w-48"
                        value={editOrgName}
                        onChange={(e) => setEditOrgName(e.target.value)}
                        disabled={loading}
                      />
                      <Input
                        className="w-48 opacity-60 cursor-not-allowed"
                        value={editOrgSlug}
                        disabled
                        readOnly
                      />
                      <Button
                        size="sm"
                        className="px-3 py-1 text-xs"
                        onClick={() => updateOrganization(org.slug)}
                        disabled={loading || !editOrgName.trim()}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        className="px-3 py-1 text-xs"
                        onClick={() => setEditOrgId(null)}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-zinc-100">
                        {org.name}
                      </span>
                      <span className="text-xs text-zinc-400">
                        ({org.slug})
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="px-2 py-2 text-zinc-200 hover:text-white hover:bg-zinc-800 transition-colors duration-200"
                        onClick={() => {
                          setEditOrgId(org.slug);
                          setEditOrgName(org.name);
                          setEditOrgSlug(org.slug);
                        }}
                        disabled={loading}
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="px-2 py-2 text-zinc-200 hover:text-white hover:bg-zinc-800 transition-colors duration-200"
                        onClick={() => deleteOrganization(org.slug)}
                        disabled={loading}
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageOrganizations;
