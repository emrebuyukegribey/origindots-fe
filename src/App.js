import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { MainContext } from "./context";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import ProcessManagement from "./pages/process/ProcessManagement";
import { useState } from "react";
import LoginScreen from "./pages/user/login/LoginScreen";
import NewProcess from "./pages/process/NewProcess";

function App() {
  const [activeLeftBar, setActiveLeftBar] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [navbarHeaderText, setNavbarHeaderText] = useState("");
  const [properList, setProperList] = useState([]);
  const [properValueList, setProperValueList] = useState([]);
  const [selectedProper, setSelectedProper] = useState({});
  const [selectedValueForAddProper, setSelectedValueForAddProper] = useState();

  let location = useLocation();

  const data = {
    activeLeftBar,
    setActiveLeftBar,
    navbarHeaderText,
    setNavbarHeaderText,
    token,
    setToken,
    properList,
    setProperList,
    properValueList,
    setProperValueList,
    selectedProper,
    setSelectedProper,
    selectedValueForAddProper,
    setSelectedValueForAddProper,
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
          path="/process-management/new-process"
          element={<NewProcess />}
        />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
