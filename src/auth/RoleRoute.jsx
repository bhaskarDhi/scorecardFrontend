import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RoleRoute({ role, children }) {
  const { user } = useAuth();

  return user?.role === role ? children : <Navigate to="/" />;
}
