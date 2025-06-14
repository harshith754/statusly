import axios from "axios";
import type {
  Organization,
  OrgService,
  OrgIncident,
  IncidentUpdate,
} from "@/types/organization";

const API_URL = import.meta.env.VITE_API_URL;

// ----------------------------
// Organizations
// ----------------------------
export const getOrganizations = async (): Promise<Organization[]> => {
  const res = await axios.get(`${API_URL}/organizations/`);
  return res.data;
};

export const createOrganization = async (
  org: Pick<Organization, "slug" | "name">
): Promise<Organization> => {
  const res = await axios.post(`${API_URL}/organizations/`, org);
  return res.data;
};

export const updateOrganization = async (
  slug: string,
  org: Pick<Organization, "slug" | "name">
): Promise<Organization> => {
  const res = await axios.put(`${API_URL}/organizations/${slug}`, org);
  return res.data;
};

export const deleteOrganization = async (slug: string): Promise<void> => {
  await axios.delete(`${API_URL}/organizations/${slug}`);
};

// ----------------------------
// Services
// ----------------------------
export const createService = async (
  slug: string,
  service: Omit<OrgService, "id">
): Promise<OrgService> => {
  const res = await axios.post(
    `${API_URL}/organizations/${slug}/services`,
    service
  );
  return res.data;
};

export const updateService = async (
  slug: string,
  service: OrgService
): Promise<OrgService> => {
  const res = await axios.put(
    `${API_URL}/organizations/${slug}/services/${service.id}`,
    service
  );
  return res.data;
};

export const deleteService = async (
  slug: string,
  serviceId: string
): Promise<void> => {
  await axios.delete(`${API_URL}/organizations/${slug}/services/${serviceId}`);
};

// ----------------------------
// Incidents
// ----------------------------
export const createIncident = async (
  slug: string,
  incident: Omit<OrgIncident, "id" | "updates">
): Promise<OrgIncident> => {
  const res = await axios.post(
    `${API_URL}/organizations/${slug}/incidents`,
    incident
  );
  return res.data;
};

export const updateIncident = async (
  slug: string,
  incident: OrgIncident
): Promise<OrgIncident> => {
  const res = await axios.put(
    `${API_URL}/organizations/${slug}/incidents/${incident.id}`,
    incident
  );
  return res.data;
};

export const deleteIncident = async (
  slug: string,
  incidentId: string
): Promise<void> => {
  await axios.delete(
    `${API_URL}/organizations/${slug}/incidents/${incidentId}`
  );
};

// ----------------------------
// Incident Updates
// ----------------------------
export const addIncidentUpdate = async (
  slug: string,
  incidentId: string,
  update: IncidentUpdate
): Promise<IncidentUpdate> => {
  const res = await axios.post(
    `${API_URL}/organizations/${slug}/incidents/${incidentId}/updates`,
    update
  );
  return res.data;
};
