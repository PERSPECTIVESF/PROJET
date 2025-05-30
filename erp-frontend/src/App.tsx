import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Accueil from "./pages/Accueil";
import Apprenants from "./pages/Apprenants";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Accueil />
          </DashboardLayout>
        }
      />
      <Route
        path="/apprenants"
        element={
          <DashboardLayout>
            <Apprenants />
          </DashboardLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
