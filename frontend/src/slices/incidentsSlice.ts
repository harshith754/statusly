import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IncidentUpdate {
  id: string;
  timestamp: string;
  message: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  affectedServices: string[];
  status: "Ongoing" | "Resolved";
  updates: IncidentUpdate[];
}

const initialState: Incident[] = [
  {
    id: "inc1",
    title: "Database Outage",
    description: "Database is currently unreachable.",
    affectedServices: ["2"],
    status: "Ongoing",
    updates: [
      {
        id: "u1",
        timestamp: new Date().toISOString(),
        message: "Investigating the issue.",
      },
    ],
  },
  {
    id: "inc2",
    title: "Auth Service Down",
    description: "Users unable to login.",
    affectedServices: ["4"],
    status: "Ongoing",
    updates: [
      {
        id: "u2",
        timestamp: new Date().toISOString(),
        message: "Issue detected.",
      },
    ],
  },
];

const incidentsSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {
    addIncident: (state, action: PayloadAction<Incident>) => {
      state.push(action.payload);
    },
    addIncidentUpdate: (
      state,
      action: PayloadAction<{ incidentId: string; update: IncidentUpdate }>
    ) => {
      const incident = state.find((i) => i.id === action.payload.incidentId);
      if (incident) incident.updates.push(action.payload.update);
    },
    resolveIncident: (state, action: PayloadAction<string>) => {
      const incident = state.find((i) => i.id === action.payload);
      if (incident) incident.status = "Resolved";
    },
  },
});

export const { addIncident, addIncidentUpdate, resolveIncident } =
  incidentsSlice.actions;
export default incidentsSlice.reducer;
