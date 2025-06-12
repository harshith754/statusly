import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "./ui/button";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [orgInput, setOrgInput] = React.useState("");

  const handleOrgInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (orgInput.trim()) {
      const safeSlug = encodeURIComponent(
        orgInput.trim().replace(/\s+/g, "-").toLowerCase()
      );
      navigate(`/status/${safeSlug}`);
    }
  };

  return (
    <aside className="h-full min-h-screen w-56 bg-zinc-900 border-r border-zinc-800 flex flex-col p-4">
      <form onSubmit={handleOrgInput} className="mb-6">
        <label
          htmlFor="org-input-admin"
          className="block text-sm font-medium mb-1 text-zinc-200"
        >
          Organization Name
        </label>
        <input
          id="org-input-admin"
          type="text"
          value={orgInput}
          onChange={(e) => setOrgInput(e.target.value)}
          className="border border-zinc-700 bg-zinc-800 text-zinc-100 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter organization name..."
        />
        <Button
          type="submit"
          className="cursor-pointer w-full transition-colors duration-200 bg-black hover:bg-zinc-950 text-white shadow-sm hover:shadow-md border border-zinc-900 mt-3"
          variant={"default"}
        >
          Go
        </Button>
      </form>
      <nav className="flex flex-col gap-2">
        <Link
          to={`/services/${slug || "demo-org"}`}
          className="text-zinc-200 hover:text-white hover:underline transition-colors"
        >
          Services
        </Link>
        <Link
          to={`/incidents/${slug || "demo-org"}`}
          className="text-zinc-200 hover:text-white hover:underline transition-colors"
        >
          Incidents
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
