import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getUser } from "../services/http";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
      setAuthUser(response.data);
    }
  };

  const setAuthUserRelations = async (
    organizationList,
    processList,
    userList
  ) => {
    authUser.organizationList = organizationList;
    authUser.processList = processList;
    authUser.userList = userList;
    setAuthUser(authUser);
  };

  const login = (user) => {
    setAuthUser(user);
    localStorage.setItem("token", user.token);
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.clear();
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <AuthContext.Provider
      value={{ authUser, login, logout, setAuthUserRelations }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
