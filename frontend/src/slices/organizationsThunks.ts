import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  IncidentUpdate,
  OrgIncident,
  OrgService,
} from "@/types/organization";
import {
  getOrganizations,
  createService,
  updateService,
  deleteService,
  createIncident,
  updateIncident,
  deleteIncident,
  addIncidentUpdate,
} from "@/api/organizations";

export const fetchOrganizations = createAsyncThunk(
  "organizations/fetchOrganizations",
  async () => await getOrganizations()
);

export const createOrgService = createAsyncThunk(
  "organizations/createService",
  async (payload: { slug: string; service: OrgService }) => {
    const data = await createService(payload.slug, payload.service);
    return { ...payload, service: data };
  }
);

export const updateOrgService = createAsyncThunk(
  "organizations/updateService",
  async (payload: { slug: string; service: OrgService }) => {
    const data = await updateService(payload.slug, payload.service);
    return { ...payload, service: data };
  }
);

export const deleteOrgService = createAsyncThunk(
  "organizations/deleteService",
  async (payload: { slug: string; serviceId: string }) => {
    await deleteService(payload.slug, payload.serviceId);
    return payload;
  }
);

export const createOrgIncident = createAsyncThunk(
  "organizations/createIncident",
  async (payload: { slug: string; incident: OrgIncident }) => {
    const data = await createIncident(payload.slug, payload.incident);
    return { ...payload, incident: data };
  }
);

export const updateOrgIncident = createAsyncThunk(
  "organizations/updateIncident",
  async (payload: { slug: string; incident: OrgIncident }) => {
    const data = await updateIncident(payload.slug, payload.incident);
    return { ...payload, incident: data };
  }
);

export const deleteOrgIncident = createAsyncThunk(
  "organizations/deleteIncident",
  async (payload: { slug: string; incidentId: string }) => {
    await deleteIncident(payload.slug, payload.incidentId);
    return payload;
  }
);

export const createIncidentUpdate = createAsyncThunk(
  "organizations/createIncidentUpdate",
  async (payload: {
    slug: string;
    incidentId: string;
    update: IncidentUpdate;
  }) => {
    const data = await addIncidentUpdate(
      payload.slug,
      payload.incidentId,
      payload.update
    );
    return {
      slug: payload.slug,
      incidentId: payload.incidentId,
      update: data,
    };
  }
);
