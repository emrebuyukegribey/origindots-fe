import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";

import { MainContext, useContext } from "../../context";
import { BsChevronLeft, BsPower } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { VscListTree } from "react-icons/vsc";
import { SlGraph } from "react-icons/sl";
import { IoMdHelp } from "react-icons/io";

import { SlOrganization } from "react-icons/sl";
import logo from "../../assets/logo-white.png";
import logoSmall from "../../assets/logo-small.png";

import "./LeftBar.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";

function LeftBar(props) {
  const { activeLeftBar, setActiveLeftBar } = useContext(MainContext);
  const [activeLink, setActiveLink] = useState(
    localStorage.getItem("activeLink") || "dashboard"
  );

  const toggleLeftBar = () => {
    setActiveLeftBar(!activeLeftBar);
  };

  const handleResize = () => {
    if (window.innerWidth < 555) {
      setActiveLeftBar(false);
    } else {
      setActiveLeftBar(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const onChangeActiveLink = (value) => {
    localStorage.setItem("activeLink", value);
    if (localStorage.getItem("activeLink")) {
      setActiveLink(localStorage.getItem("activeLink"));
    } else {
      setActiveLink(value);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/user/login";
  };

  return (
    <div className={activeLeftBar ? "lb-container" : "lb-container-close"}>
      <div className="lb-logo-container">
        <img
          alt="logo"
          src={!activeLeftBar ? logoSmall : logo}
          className="lb-logo"
        />
      </div>
      <div className="lb-menu-container">
        <ul className="lb-menu">
          <NavLink to={"/"}>
            <li
              className={
                activeLink.includes("dashboard")
                  ? "lb-menu-item selected"
                  : "lb-menu-item"
              }
              onClick={() => {
                onChangeActiveLink("dashboard");
              }}
            >
              <div className="lb-menu-item-icon">
                <AiOutlineHome />
              </div>
              <div className={activeLeftBar ? "lb-menu-item-text" : "close"}>
                {props.t("Dashboard")}
              </div>
            </li>
          </NavLink>
          <NavLink to="/organization-management">
            <li
              className={
                activeLink.includes("organization")
                  ? "lb-menu-item selected"
                  : "lb-menu-item"
              }
              onClick={() => {
                onChangeActiveLink("organization");
              }}
            >
              <div className="lb-menu-item-icon">
                <SlOrganization />
              </div>
              <div className={activeLeftBar ? "lb-menu-item-text" : "close"}>
                {props.t("Organization Management")}
              </div>
            </li>
          </NavLink>
          <NavLink to="/user-management">
            <li
              className={
                activeLink.includes("user")
                  ? "lb-menu-item selected"
                  : "lb-menu-item"
              }
              onClick={() => {
                onChangeActiveLink("user");
              }}
            >
              <div className="lb-menu-item-icon">
                <FiUsers />
              </div>
              <div className={activeLeftBar ? "lb-menu-item-text" : "close"}>
                {props.t("User Management")}
              </div>
            </li>
          </NavLink>
          <NavLink to="/process-management">
            <li
              className={
                activeLink.includes("process")
                  ? "lb-menu-item selected"
                  : "lb-menu-item"
              }
              onClick={() => {
                onChangeActiveLink("process");
              }}
            >
              <div className="lb-menu-item-icon">
                <VscListTree />
              </div>
              <div className={activeLeftBar ? "lb-menu-item-text" : "close"}>
                {props.t("Process Management")}
              </div>
            </li>
          </NavLink>
          <NavLink>
            <li
              className={
                activeLink.includes("analystic")
                  ? "lb-menu-item selected"
                  : "lb-menu-item"
              }
              onClick={() => {
                onChangeActiveLink("analystic");
              }}
            >
              <div className="lb-menu-item-icon">
                <SlGraph />
              </div>
              <div className={activeLeftBar ? "lb-menu-item-text" : "close"}>
                {props.t("Analystic Data")}
              </div>
            </li>
          </NavLink>
          <NavLink>
            <li
              className={
                activeLink.includes("settings")
                  ? "lb-menu-item selected"
                  : "lb-menu-item"
              }
              onClick={() => {
                onChangeActiveLink("settings");
              }}
            >
              <div className="lb-menu-item-icon">
                <AiOutlineSetting />
              </div>
              <div className={activeLeftBar ? "lb-menu-item-text" : "close"}>
                {props.t("Settings")}
              </div>
            </li>
          </NavLink>
          <NavLink>
            <li
              className={
                activeLink.includes("help")
                  ? "lb-menu-item selected"
                  : "lb-menu-item"
              }
              onClick={() => {
                onChangeActiveLink("help");
              }}
            >
              <div className="lb-menu-item-icon">
                <IoMdHelp />
              </div>
              <div className={activeLeftBar ? "lb-menu-item-text" : "close"}>
                {props.t("Help")}
              </div>
            </li>
          </NavLink>
          <NavLink>
            <li
              className={
                activeLink.includes("help")
                  ? "lb-menu-item selected"
                  : "lb-menu-item"
              }
              onClick={logout}
            >
              <div className="lb-menu-item-icon">
                <BsPower />
              </div>
              <div className={activeLeftBar ? "lb-menu-item-text" : "close"}>
                {props.t("Logout")}
              </div>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="lb-bottom-container" onClick={toggleLeftBar}>
        <BsChevronLeft
          size={22}
          className={activeLeftBar ? "lb-bottom-icon" : "lb-bottom-icon-right"}
        />
      </div>
    </div>
  );
}

const LeftBarWithTranslation = withTranslation()(LeftBar);
export default LeftBarWithTranslation;
