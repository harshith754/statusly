import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Sidebar from "../components/Sidebar";
import { Button } from "@/components/ui/button";

interface ClerkUser {
  id: string;
  [key: string]: any;
}

const ManageUsers: React.FC = () => {
  const { user } = useUser();
  const [users, setUsers] = useState<ClerkUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [orgEdit, setOrgEdit] = useState<{ [userId: string]: string }>({});
  const [orgEditLoading, setOrgEditLoading] = useState<{
    [userId: string]: boolean;
  }>({});
  const [orgEditSuccess, setOrgEditSuccess] = useState<{
    [userId: string]: boolean;
  }>({});

  function removeOrgEditKey(userId: string) {
    const newEdit = { ...orgEdit };
    delete newEdit[userId];
    setOrgEdit(newEdit);
  }

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/admin/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Helper to extract email and orgs from Clerk user object
  function getPrimaryEmail(user: any) {
    if (user.primary_email_address_id && Array.isArray(user.email_addresses)) {
      const emailObj = user.email_addresses.find(
        (e: any) => e.id === user.primary_email_address_id
      );
      return emailObj?.email_address || "";
    }
    return user.email || "";
  }

  function getAllowedOrgs(user: any) {
    if (
      user.public_metadata &&
      Array.isArray(user.public_metadata.allowedOrgs)
    ) {
      return user.public_metadata.allowedOrgs;
    }
    return [];
  }

  async function updateUserOrgs(userId: string, orgs: string[]) {
    const res = await fetch(
      import.meta.env.VITE_API_URL + `/admin/users/${userId}/orgs`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orgs),
      }
    );
    if (!res.ok) throw new Error("Failed to update user orgs");
    return await res.json();
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">You</h2>
          <div>Name: {user?.fullName}</div>
          <div>Email: {user?.primaryEmailAddress?.emailAddress}</div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">All Users</h2>
          {loading ? (
            <div>Loading users...</div>
          ) : (
            <ul className="space-y-2">
              {users.map((user) => {
                const editing = orgEdit[user.id] !== undefined;
                return (
                  <li key={user.id} className="border border-zinc-800 p-3 rounded bg-zinc-900">
                    <div className="font-semibold">
                      {user.first_name ||
                        user.fullName ||
                        user.username ||
                        user.id}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {getPrimaryEmail(user)}
                    </div>
                    <div className="text-sm mt-1 flex items-center gap-2">
                      Allowed Orgs:{" "}
                      {editing ? (
                        <>
                          <input
                            className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 w-48"
                            value={orgEdit[user.id]}
                            onChange={(e) =>
                              setOrgEdit({
                                ...orgEdit,
                                [user.id]: e.target.value,
                              })
                            }
                            disabled={orgEditLoading[user.id]}
                          />
                          <Button
                            size="sm"
                            className="px-2 py-1 text-xs bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors duration-200 cursor-pointer"
                            disabled={orgEditLoading[user.id]}
                            onClick={async () => {
                              setOrgEditLoading({
                                ...orgEditLoading,
                                [user.id]: true,
                              });
                              try {
                                await updateUserOrgs(
                                  user.id,
                                  orgEdit[user.id]
                                    .split(",")
                                    .map((o) => o.trim())
                                    .filter(Boolean)
                                );
                                setOrgEditSuccess({
                                  ...orgEditSuccess,
                                  [user.id]: true,
                                });
                                setTimeout(
                                  () =>
                                    setOrgEditSuccess({
                                      ...orgEditSuccess,
                                      [user.id]: false,
                                    }),
                                  1200
                                );
                                removeOrgEditKey(user.id);
                                setTimeout(() => fetchUsers(), 100);
                              } catch (e) {
                                setOrgEditSuccess({
                                  ...orgEditSuccess,
                                  [user.id]: false,
                                });
                              } finally {
                                setOrgEditLoading({
                                  ...orgEditLoading,
                                  [user.id]: false,
                                });
                              }
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            className="px-2 py-1 text-xs bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors duration-200 cursor-pointer"
                            onClick={() => removeOrgEditKey(user.id)}
                          >
                            Cancel
                          </Button>
                          {orgEditSuccess[user.id] && (
                            <span className="text-green-400 text-xs ml-2">
                              Updated!
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          {getAllowedOrgs(user).length > 0
                            ? getAllowedOrgs(user).join(", ")
                            : "None"}
                          <Button
                            size="sm"
                            className="ml-2 px-2 py-1 text-xs bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors duration-200 cursor-pointer"
                            onClick={() =>
                              setOrgEdit({
                                ...orgEdit,
                                [user.id]: getAllowedOrgs(user).join(", "),
                              })
                            }
                          >
                            Edit
                          </Button>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
