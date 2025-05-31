import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/authentication/hooks/useAuth";

const PublicRoute = ({ redirectPath = "/" }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Loading session...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
