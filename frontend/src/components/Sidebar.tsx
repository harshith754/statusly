import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "./ui/dropdown";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [orgInput, setOrgInput] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const organizations = useSelector(
    (state: any) => state.organizations.organizations
  );
  const selectedOrg = organizations.find((org: any) => org.slug === orgInput);

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
      <form onSubmit={handleOrgInput} className="mb-6" autoComplete="off">
        <label
          htmlFor="org-input-admin"
          className="block text-sm font-medium mb-1 text-zinc-200"
        >
          Organization Name
        </label>
        <Dropdown>
          <DropdownTrigger
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
            className="w-full flex justify-between items-center"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            {selectedOrg ? selectedOrg.name : "Enter name"}
            <span className="ml-2">▼</span>
          </DropdownTrigger>
          {dropdownOpen && (
            <DropdownContent role="listbox">
              {organizations.map((org: any) => (
                <DropdownItem
                  key={org.slug}
                  role="option"
                  aria-selected={orgInput === org.slug}
                  onClick={() => {
                    setOrgInput(org.slug);
                    setDropdownOpen(false);
                  }}
                >
                  {org.name}
                </DropdownItem>
              ))}
            </DropdownContent>
          )}
        </Dropdown>
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
          to={`/dashboard/${slug || "demo-org"}`}
          className="text-zinc-200 hover:text-white hover:underline transition-colors"
        >
          Dashboard
        </Link>
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
