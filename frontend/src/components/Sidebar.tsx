import React from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutDashboard,
  Server,
  AlertTriangle,
  Building2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const [selectedOrgSlug, setSelectedOrgSlug] = React.useState(
    slug || "demo-org"
  );

  const organizations = useSelector(
    (state: any) => state.organizations.organizations
  );

  const selectedOrg = organizations.find(
    (org: any) => org.slug === selectedOrgSlug
  );

  const handleOrgChange = (newSlug: string) => {
    setSelectedOrgSlug(newSlug);

    // Determine the current page type and navigate to the same page for the new org
    if (location.pathname.includes("/dashboard/")) {
      navigate(`/dashboard/${newSlug}`);
    } else if (location.pathname.includes("/services/")) {
      navigate(`/services/${newSlug}`);
    } else if (location.pathname.includes("/incidents/")) {
      navigate(`/incidents/${newSlug}`);
    } else {
      navigate(`/dashboard/${newSlug}`);
    }
  };

  // Update selected org when URL changes
  React.useEffect(() => {
    if (slug && slug !== selectedOrgSlug) {
      setSelectedOrgSlug(slug);
    }
  }, [slug, selectedOrgSlug]);

  const navigationItems = [
    {
      name: "Dashboard",
      href: `/dashboard/${selectedOrgSlug}`,
      icon: LayoutDashboard,
      active: location.pathname.includes("/dashboard/"),
    },
    {
      name: "Services",
      href: `/services/${selectedOrgSlug}`,
      icon: Server,
      active: location.pathname.includes("/services/"),
    },
    {
      name: "Incidents",
      href: `/incidents/${selectedOrgSlug}`,
      icon: AlertTriangle,
      active: location.pathname.includes("/incidents/"),
    },
  ];

  return (
    <aside className="min-h-screen w-64 bg-zinc-900/50 border-r border-zinc-800/50 shrink-0">
      <div className="p-6 border-b border-zinc-800/50">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm font-medium text-zinc-400">
            <Building2 className="h-4 w-4" />
            <span>Organization</span>
          </div>

          <Select value={selectedOrgSlug} onValueChange={handleOrgChange}>
            <SelectTrigger className="w-full bg-zinc-800/50 border-zinc-700/50 text-zinc-100 hover:bg-zinc-800/70 focus:ring-zinc-600">
              <SelectValue>
                {selectedOrg ? selectedOrg.name : "Select organization"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              {organizations.map((org: any) => (
                <SelectItem
                  key={org.slug}
                  value={org.slug}
                  className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>{org.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                item.active
                  ? "bg-zinc-800 text-zinc-100 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  item.active
                    ? "text-zinc-300"
                    : "text-zinc-500 group-hover:text-zinc-400"
                )}
              />
              <span className="flex-1">{item.name}</span>
              {item.active && (
                <ChevronRight className="h-3 w-3 text-zinc-500" />
              )}
            </Link>
          );
        })}
      </nav>
      {/* Footer */}
      <div className="p-4 border-t border-zinc-800/50">
        <div className="text-xs text-zinc-500 text-center">
          {selectedOrg ? (
            <div className="space-y-1">
              <div className="font-medium text-zinc-400">
                {selectedOrg.name}
              </div>
              <div className="flex items-center justify-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span>Active</span>
              </div>
            </div>
          ) : (
            <span>No organization selected</span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
