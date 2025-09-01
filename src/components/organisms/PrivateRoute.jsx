import { Navigate } from "react-router-dom";
import { showError } from "../../utils/alerts";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const { isAdmin } = useAuth();
  
  if (!token || !user) {
    showError("No autorizado. Por favor inicia sesión.");
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin" && !isAdmin) {
    showError("No tienes permisos para acceder a esta sección.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;

