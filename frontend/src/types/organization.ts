

export interface OrganizationsState {
  organizations: Organization[];
  loading: boolean;
  error: string | null;
}

export type OrgServiceStatus =
  | "Operational"
  | "Degraded Performance"
  | "Partial Outage"
  | "Major Outage";

export type OrgIncidentStatus = "Ongoing" | "Resolved";

export interface IncidentUpdate {
  id: string;
  timestamp: string;
  message: string;
}

export interface OrgService {
  id: string;
  name: string;
  status: OrgServiceStatus;
}

export interface OrgIncident {
  id: string;
  title: string;
  description: string;
  status: OrgIncidentStatus;
  affected_services: string[];
  updates: IncidentUpdate[];
}

export interface Organization {
  slug: string;
  name: string;
  services: OrgService[];
  incidents: OrgIncident[];
}
