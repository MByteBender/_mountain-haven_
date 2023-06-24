import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth(); // Access the isLoggedIn value from the AuthContext

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
