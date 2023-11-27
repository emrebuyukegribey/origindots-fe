import "./ProcessManagementStyles.css";
import { withTranslation } from "react-i18next";
import { MainContext, useContext } from "../../context";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";
import DarkButtonBorder from "../../components/UI/Buttons/DarkButtonBorder";
import { useRef } from "react";

function ProcessManagement(props) {
  const { setNavbarHeaderText, activeLeftBar } = useContext(MainContext);
  setNavbarHeaderText("Process Management");

  const navigate = useNavigate();

  const openNewProcess = () => {
    navigate("/process-management/new-process");
  };

  return (
    <>
      <NavLink to="/process-management/new-process">
        {props.t("Create New Process")}
      </NavLink>
      <Navbar />
      <LeftBar />
      <div
        className="right-container"
        style={{
          width: activeLeftBar ? "calc(100% - 275px)" : "calc(100% - 70px)",
          marginLeft: activeLeftBar ? "275px" : "70px",
        }}
      >
        <div className="process-management-container">
          <div className="process-management-header-container">
            <div className="process-management-menu-container">
              <DarkButtonBorder
                text="Create Process"
                onClick={openNewProcess}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ProcessManagementWithTranslation = withTranslation()(ProcessManagement);
export default ProcessManagementWithTranslation;
