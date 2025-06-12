import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "./slices/servicesSlice";
import incidentsReducer from "./slices/incidentsSlice";
import organizationsReducer from "./slices/organizationsSlice";

const store = configureStore({
  reducer: {
    services: servicesReducer,
    incidents: incidentsReducer,
    organizations: organizationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
