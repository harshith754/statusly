import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrganizationsState } from "@/types/organization";
import {
  createIncidentUpdate,
  createOrgIncident,
  createOrgService,
  deleteOrgIncident,
  deleteOrgService,
  fetchOrganizations,
  updateOrgIncident,
  updateOrgService,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "./organizationsThunks";

const initialState: OrganizationsState = {
  organizations: [],
  loading: false,
  error: null,
};

// SLICE

const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    addIncidentUpdateToOrg: (
      state,
      action: PayloadAction<{
        slug: string;
        incidentId: string;
        update: { id: string; timestamp: string; message: string };
      }>
    ) => {
      const org = state.organizations.find(
        (o) => o.slug === action.payload.slug
      );
      const incident = org?.incidents.find(
        (i) => i.id === action.payload.incidentId
      );
      incident?.updates.push(action.payload.update);
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.organizations = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load organizations";
      })
      // ORG CRUD
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.organizations.push(action.payload);
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        const idx = state.organizations.findIndex(
          (o) => o.slug === action.payload.slug
        );
        if (idx > -1) {
          state.organizations[idx] = action.payload;
        }
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.organizations = state.organizations.filter(
          (o) => o.slug !== action.payload
        );
      })

      // SERVICES
      .addCase(createOrgService.fulfilled, (state, action) => {
        const org = state.organizations.find(
          (o) => o.slug === action.payload.slug
        );
        org?.services.push(action.payload.service);
      })
      .addCase(updateOrgService.fulfilled, (state, action) => {
        const org = state.organizations.find(
          (o) => o.slug === action.payload.slug
        );
        const idx = org?.services.findIndex(
          (s) => s.id === action.payload.service.id
        );
        if (org && idx !== undefined && idx > -1) {
          org.services[idx] = action.payload.service;
        }
      })
      .addCase(deleteOrgService.fulfilled, (state, action) => {
        const org = state.organizations.find(
          (o) => o.slug === action.payload.slug
        );
        if (org) {
          org.services = org.services.filter(
            (s) => s.id !== action.payload.serviceId
          );
        }
      })

      .addCase(createOrgIncident.fulfilled, (state, action) => {
        const org = state.organizations.find(
          (o) => o.slug === action.payload.slug
        );
        org?.incidents.push(action.payload.incident);
      })
      .addCase(updateOrgIncident.fulfilled, (state, action) => {
        const org = state.organizations.find(
          (o) => o.slug === action.payload.slug
        );
        const idx = org?.incidents.findIndex(
          (i) => i.id === action.payload.incident.id
        );
        if (org && idx !== undefined && idx > -1) {
          org.incidents[idx] = {
            ...action.payload.incident,
            updates: org.incidents[idx].updates,
          };
        }
      })
      .addCase(deleteOrgIncident.fulfilled, (state, action) => {
        const org = state.organizations.find(
          (o) => o.slug === action.payload.slug
        );
        if (org) {
          org.incidents = org.incidents.filter(
            (i) => i.id !== action.payload.incidentId
          );
        }
      })
      .addCase(createIncidentUpdate.fulfilled, (state, action) => {
        const { slug, incidentId, update } = action.payload;
        const org = state.organizations.find((o) => o.slug === slug);
        const incident = org?.incidents.find((i) => i.id === incidentId);
        if (incident) {
          incident.updates.push(update);
        }
      });
  },
});

export const { addIncidentUpdateToOrg } = organizationsSlice.actions;
export default organizationsSlice.reducer;
