import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { MainContext } from "./context";
import "./App.css";
import About from "./pages/About";
import ProcessManagement from "./pages/process/ProcessManagement";
import { useEffect, useState } from "react";
import LoginScreen from "./pages/user/login/LoginScreen";
import NewProcess from "./pages/process/NewProcess";
import Dashboard from "./pages/dashboard/Dashboard";
import UserManagement from "./pages/users/UserManagement";
import OrganizationManagement from "./pages/organization/OrganizationManagement";

function App() {
  const [activeLeftBar, setActiveLeftBar] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [navbarHeaderText, setNavbarHeaderText] = useState("");
  const [properValueList, setProperValueList] = useState([]);
  const [selectedProper, setSelectedProper] = useState({});

  let location = useLocation();

  const data = {
    activeLeftBar,
    setActiveLeftBar,
    navbarHeaderText,
    setNavbarHeaderText,
    token,
    setToken,
    properValueList,
    setProperValueList,
    selectedProper,
    setSelectedProper,
  };

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (!token) {
        navigate("/user/login");
        return null;
      }

      if (token && location.pathname === "/user/login") {
        navigate("/");
        return null;
      }
    }, 200);
  }, []);

  return (
    <MainContext.Provider value={data} className="App">
      <Routes>
        <Route
          path="/"
          element={<Dashboard setNavbarHeaderText={setNavbarHeaderText} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/user/login" element={<LoginScreen setToken />} />
        <Route
          path="/process-management"
          element={
            <ProcessManagement setNavbarHeaderText={setNavbarHeaderText} />
          }
        />
        <Route
          path="/user-management"
          element={<UserManagement setNavbarHeaderText={setNavbarHeaderText} />}
        />
        <Route
          path="/organization-management"
          element={
            <OrganizationManagement setNavbarHeaderText={setNavbarHeaderText} />
          }
        />
        <Route
          path="/process-management/new-process"
          element={<NewProcess setNavbarHeaderText={setNavbarHeaderText} />}
        />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
