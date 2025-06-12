import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type ServiceStatus = "Operational"| "Degraded Performance"| "Partial Outage"| "Major Outage";
export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
}

const initialState: Service[] = [
  { id: "1", name: "API Gateway", status: "Operational" },
  { id: "2", name: "Database", status: "Degraded Performance" },
  { id: "3", name: "Frontend", status: "Operational" },
  { id: "4", name: "Auth", status: "Major Outage" },
  { id: "5", name: "Email", status: "Operational" },
];

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    addService: (state, action: PayloadAction<Service>) => {
      state.push(action.payload);
    },
    updateService: (state, action: PayloadAction<Service>) => {
      const idx = state.findIndex((s) => s.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    deleteService: (state, action: PayloadAction<string>) => {
      return state.filter((s) => s.id !== action.payload);
    },
    setServiceStatus: (
      state,
      action: PayloadAction<{ id: string; status: ServiceStatus }>
    ) => {
      const service = state.find((s) => s.id === action.payload.id);
      if (service) service.status = action.payload.status;
    },
  },
});

export const { addService, updateService, deleteService, setServiceStatus } =
  servicesSlice.actions;
export default servicesSlice.reducer;
