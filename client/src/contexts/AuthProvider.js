import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!Cookies.get("token"); //convertign it to a boolena with !!
  });

  const login = async (username, password) => {
    const contact = {
      username: username,
      password: password,
    };

    const response = await fetch("/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    const data = await response.json();

    if (data.message === "Succes") {
      // Store the token in a cookie

      Cookies.set("token", data.token);
      setIsLoggedIn(true);
      navigate("/admin/openbookings");
    } else if (data.message === "Denied") {
      alert("Wrong username or password");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    alert("You are logged out now");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
