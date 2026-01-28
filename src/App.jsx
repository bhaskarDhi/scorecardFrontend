import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import Guidelines from "./pages/admin/Guidelines";
import DistrictGuidelines from "./pages/admin/DistrictGuidelines";
import DepartmentGuidelines from "./pages/admin/DepartmentGuidelines";
import CreateQuestion from "./pages/admin/CreateQuestion";
import Mpas from "./pages/admin/Mpas";
import District from "./pages/district/District";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute role="ROLE_ADMIN">
                <Guidelines /> {/* layout + table */}
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/guidelines/district"
          element={
            <ProtectedRoute>
              <RoleRoute role="ROLE_ADMIN">
                <DistrictGuidelines />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/guidelines/department"
          element={
            <ProtectedRoute>
              <RoleRoute role="ROLE_ADMIN">
                <DepartmentGuidelines />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/mpas"
          element={
            <ProtectedRoute>
              <RoleRoute role="ROLE_ADMIN">
                <Mpas />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/questions/create"
          element={
            <ProtectedRoute>
              <RoleRoute role="ROLE_ADMIN">
                <CreateQuestion />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/district/questions/view"
          element={
            <ProtectedRoute>
              <RoleRoute role="ROLE_DISTRICT">
                <District />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
