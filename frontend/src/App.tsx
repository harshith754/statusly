import { useEffect, useState } from "react";
import { SignedIn } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "@/pages/dashboard";
import ServicesPage from "@/pages/services";
import IncidentsPage from "@/pages/incidents";
import ManageUsers from "@/pages/manage-users";
import Navbar from "@/components/Navbar";
import store from "@/store";
import { fetchOrganizations } from "@/slices/organizationsThunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import ManageOrganizations from "@/pages/manage-organizations";

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  const dispatch = useAppDispatch();
  const loading = useSelector(
    (state: RootState) => state.organizations.loading
  );
  const [wsFetching, setWsFetching] = useState(false);
  const WS_URL = import.meta.env.VITE_WS_URL;

  useEffect(() => {
    dispatch(fetchOrganizations());
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      console.log("[WebSocket] Connected to server");
    };
    ws.onmessage = (event) => {
      const data = event.data;
      console.log("[WebSocket] Message received:", data);
      if (data === "generic_update") {
        setWsFetching(true);
        dispatch(fetchOrganizations()).finally(() => setWsFetching(false));
      }
    };
    ws.onclose = () => {
      console.log("[WebSocket] Disconnected");
    };
    ws.onerror = (err) => {
      console.error("[WebSocket] Error:", err);
    };
    return () => {
      ws.close();
    };
  }, [dispatch]);

  if (loading && !wsFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="text-center space-y-2">
          <span className="animate-spin inline-block w-8 h-8 border-4 border-zinc-700 border-t-zinc-300 rounded-full mb-2" />
          <div className="text-lg font-medium">Loading Data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <main className="max-w-7xl mx-auto">
        <Routes>
          <Route path="/dashboard/:slug" element={<DashboardPage />} />
          <Route path="/services/:slug" element={<ServicesPage />} />
          <Route path="/incidents/:slug" element={<IncidentsPage />} />
          <Route
            path="/manage-users"
            element={
              <SignedIn>
                <ManageUsers />
              </SignedIn>
            }
          />
          <Route
            path="/manage-organizations"
            element={
              <SignedIn>
                <ManageOrganizations />
              </SignedIn>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard/demo-org" />} />
        </Routes>
      </main>
    </div>
  );
}
