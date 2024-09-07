import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await response.data;
      if (res && res.success) {
        const userData = res.data;
        setUser(userData.user);
        setToken(userData.token);
        localStorage.setItem("token", userData.token);
        navigate("/");
        return;
      }
    } catch (err) {
      setMsg(err.response.data);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;

export const useAuth = () => {
  return useContext(AuthContext);
};
