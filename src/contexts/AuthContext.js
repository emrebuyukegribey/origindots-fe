import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getUser } from "../services/http";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("auth provider");
    if (!authUser) {
      if (localStorage.getItem("token")) {
        setLoginUser();
      } else {
        // logout();
      }
    }
  }, []);

  const setLoginUser = async () => {
    const response = await getUser();
    if (response.status === 200) {
      console.log("RESPONSE DATA : ", response.data);
      setAuthUser(response.data);
    }
  };

  const login = (user) => {
    console.log("LOGIN user : ", user);
    setAuthUser(user);
    localStorage.setItem("token", user.token);
  };

  const logout = () => {
    console.log("veli");
    setAuthUser(null);
    localStorage.clear();
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {console.log("children : ", children)}
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
