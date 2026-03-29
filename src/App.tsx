import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth, type UserRole } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";
import AnalystDashboard from "./pages/AnalystDashboard";
import InstitutionDashboard from "./pages/InstitutionDashboard";

function Guard({
  role,
  children,
}: {
  role: Exclude<UserRole, null>;
  children: React.ReactNode;
}) {
  const { role: r } = useAuth();
  if (!r) return <Navigate to="/login" replace />;
  if (r !== role) return <Navigate to={`/${r}`} replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/farmer"
        element={
          <Guard role="farmer">
            <FarmerDashboard />
          </Guard>
        }
      />
      <Route
        path="/analyst"
        element={
          <Guard role="analyst">
            <AnalystDashboard />
          </Guard>
        }
      />
      <Route
        path="/institution"
        element={
          <Guard role="institution">
            <InstitutionDashboard />
          </Guard>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
