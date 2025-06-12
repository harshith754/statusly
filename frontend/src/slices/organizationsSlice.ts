import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface OrgService {
  id: string;
  name: string;
  status:
    | "Operational"
    | "Degraded Performance"
    | "Partial Outage"
    | "Major Outage";
}

export interface OrgIncident {
  id: string;
  title: string;
  description: string;
  status: "Ongoing" | "Resolved";
  updates: { id: string; timestamp: string; message: string }[];
  affectedServices: string[];
}

export interface Organization {
  slug: string;
  name: string;
  services: OrgService[];
  incidents: OrgIncident[];
}

interface OrganizationsState {
  organizations: Organization[];
}

const initialState: OrganizationsState = {
  organizations: [
    {
      slug: "demo-org",
      name: "Demo Org",
      services: [
        { id: "1", name: "API Gateway", status: "Operational" },
        { id: "2", name: "Database", status: "Degraded Performance" },
        { id: "3", name: "Frontend", status: "Operational" },
        { id: "4", name: "Auth", status: "Major Outage" },
        { id: "5", name: "Email", status: "Operational" },
      ],
      incidents: [
        {
          id: "inc1",
          title: "Database Outage",
          description: "Database is currently unreachable.",
          status: "Ongoing",
          updates: [
            {
              id: "u1",
              timestamp: new Date().toISOString(),
              message: "Investigating the issue.",
            },
          ],
          affectedServices: ["2"],
        },
      ],
    },
  ],
};

const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    addOrganization: (state, action: PayloadAction<Organization>) => {
      state.organizations.push(action.payload);
    },
    addServiceToOrg: (
      state,
      action: PayloadAction<{ slug: string; service: OrgService }>
    ) => {
      const org = state.organizations.find(
        (o) => o.slug === action.payload.slug
      );
      if (org) org.services.push(action.payload.service);
    },
    updateServiceInOrg: (
      state,
      action: PayloadAction<{ slug: string; service: OrgService }>
    ) => {
      const org = state.organizations.find(
        (o) => o.slug === action.payload.slug
      );
      if (org) {
        const idx = org.services.findIndex(
          (s) => s.id === action.payload.service.id
        );
        if (idx !== -1) org.services[idx] = action.payload.service;
      }
    },
    addIncidentToOrg: (
      state,
      action: PayloadAction<{ slug: string; incident: OrgIncident }>
    ) => {
      const org = state.organizations.find(
        (o) => o.slug === action.payload.slug
      );
      if (org) org.incidents.push(action.payload.incident);
    },
    updateIncidentInOrg: (
      state,
      action: PayloadAction<{ slug: string; incident: OrgIncident }>
    ) => {
      const org = state.organizations.find(
        (o) => o.slug === action.payload.slug
      );
      if (org) {
        const idx = org.incidents.findIndex(
          (i) => i.id === action.payload.incident.id
        );
        if (idx !== -1) org.incidents[idx] = action.payload.incident;
      }
    },
  },
});

export const {
  addOrganization,
  addServiceToOrg,
  updateServiceInOrg,
  addIncidentToOrg,
  updateIncidentInOrg,
} = organizationsSlice.actions;
export default organizationsSlice.reducer;
