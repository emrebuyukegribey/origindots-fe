import "./ProcessManagementStyles.css";
import { withTranslation } from "react-i18next";
import { MainContext, useContext } from "../../context";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";

function ProcessManagement(props) {
  const { setNavbarHeaderText, activeLeftBar } = useContext(MainContext);
  setNavbarHeaderText("Process Management");

  return (
    <>
      <Navbar />
      <LeftBar />
      <div
        className="right-container"
        style={{
          width: activeLeftBar ? "calc(100% - 275px)" : "calc(100% - 70px)",
          marginLeft: activeLeftBar ? "275px" : "70px",
        }}
      >
        <div className="pm-container">
          <div className="pm-header-container">
            <div className="pm-header-menu-container">
              <div className="pm-header-menu-item">
                <div className="pm-header-menu-text">
                  <NavLink to="/process-management/new-process">
                    {props.t("Create New Process")}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ProcessManagementWithTranslation = withTranslation()(ProcessManagement);
export default ProcessManagementWithTranslation;
