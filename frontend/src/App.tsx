import { useEffect } from "react";
import { SignedIn } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "@/pages/dashboard";
import ServicesPage from "@/pages/services";
import IncidentsPage from "@/pages/incidents";
import SettingsPage from "@/pages/settings";
import Navbar from "@/components/Navbar";
import store from "@/store";
import { fetchOrganizations } from "@/slices/organizationsThunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("Fetching organizations...");
    dispatch(fetchOrganizations());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <main className="max-w-7xl mx-auto">
        <Routes>
          <Route path="/dashboard/:slug" element={<DashboardPage />} />
          <Route path="/services/:slug" element={<ServicesPage />} />
          <Route path="/incidents/:slug" element={<IncidentsPage />} />
          <Route
            path="/settings"
            element={
              <SignedIn>
                <SettingsPage />
              </SignedIn>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard/demo-org" />} />
        </Routes>
      </main>
    </div>
  );
}
