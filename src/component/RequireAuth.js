import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Outlet means any child component of RequireAuth
// So RequireAuth can protect its child components
function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth(); // auth is an object {user, pwd, roles, accessToken}
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
