import {
  redirect,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { MainContext, useContext } from "./context";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import ProcessManagement from "./pages/process/ProcessManagement";
import Navbar from "./components/Navbar/Navbar";
import LeftBar from "./components/LeftBar/LeftBar";
import { useState } from "react";
import CreateProcess from "./pages/process/CreateProcess";
import LoginScreen from "./pages/user/login/LoginScreen";
import RegisterScreen from "./pages/user/register/RegisterScreen";

import { useEffect } from "react";

function App() {
  const [activeLeftBar, setActiveLeftBar] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [navbarHeaderText, setNavbarHeaderText] = useState("");

  let location = useLocation();

  const data = {
    activeLeftBar,
    setActiveLeftBar,
    navbarHeaderText,
    setNavbarHeaderText,
    token,
    setToken,
  };

  const navigate = useNavigate();

  if (!token) {
    navigate("/user/login");
  }

  if (token && location.pathname === "/user/login") {
    navigate("/");
  }

  return (
    <MainContext.Provider value={data} className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/login" element={<LoginScreen />} />
        <Route path="/process-management" element={<ProcessManagement />} />
        <Route
          path="/process-management/create-process"
          element={<CreateProcess />}
        />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
