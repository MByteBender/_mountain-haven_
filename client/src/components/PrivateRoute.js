import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]); //ensures that the effect is triggered whenever the isLoggedIn state or the navigate function changes.

  return isLoggedIn ? children : null; // render childrens if user is authenticated
};

export default PrivateRoute;
