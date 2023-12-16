import { useContext, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    const history = useNavigate();
    history("/");
  }

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
