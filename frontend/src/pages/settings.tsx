import React from "react";
import { useUser, useOrganization } from "@clerk/clerk-react";
import Sidebar from "../components/Sidebar";

const mockTeam = [
  { id: "1", name: "Alice", role: "Admin" },
  { id: "2", name: "Bob", role: "Member" },
  { id: "3", name: "Charlie", role: "Member" },
];

const SettingsPage: React.FC = () => {
  const { user } = useUser();
  const { organization } = useOrganization();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">User Info</h2>
          <div>Name: {user?.fullName}</div>
          <div>Email: {user?.primaryEmailAddress?.emailAddress}</div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Organization</h2>
          <div>Name: {organization?.name}</div>
          <div>Slug: {organization?.slug}</div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Team Members</h2>
          <ul>
            {mockTeam.map((member) => (
              <li key={member.id} className="mb-1">
                {member.name}{" "}
                <span className="text-gray-500">({member.role})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
