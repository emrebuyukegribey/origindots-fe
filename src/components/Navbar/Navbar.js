import "./Navbar.css";
import { BiMessageAltDetail, BiSearch } from "react-icons/bi";
import {
  MdKeyboardArrowDown,
  MdOutlineArrowDropDown,
  MdOutlineKeyboardArrowDown,
  MdOutlineNotifications,
} from "react-icons/md";
import { useContext, MainContext } from "../../context";
import { withTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ProfilePhotoDefault } from "../../assets/profile-default.jpg";
import { FaRegUser, FaUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { HiOutlineUser } from "react-icons/hi2";
import { LuUser } from "react-icons/lu";
import { AiOutlineUsb, AiOutlineUser } from "react-icons/ai";

function Navbar(props) {
  const { activeLeftBar, navbarHeaderText } = useContext(MainContext);
  const auth = useAuth();

  const headerText = String(navbarHeaderText);

  const onChangeLanguage = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
  };
  return (
    <div
      className="nb-container"
      style={{
        marginLeft: activeLeftBar ? "275px" : "70px",
      }}
    >
      <div
        className="nb-menu-container"
        style={{
          width: activeLeftBar ? "calc(100% - 275px)" : "calc(100% - 70px)",
        }}
      >
        <div className="nb-header-text">{props.t(headerText)}</div>
        <div>
          <ul className="nb-right-menu">
            <li className="nb-right-menu-item" style={{ marginTop: "4px" }}>
              <BiSearch size={22} />
            </li>

            <li className="nb-right-menu-item">
              <MdOutlineNotifications size={22} />
            </li>
            <li className="nb-right-menu-item">
              <BiMessageAltDetail size={22} style={{ marginTop: "2px" }} />
            </li>
            <NavLink to="/profile">
              <li className="nb-right-menu-profile">
                {console.log("auth.authUser : ", auth.authUser)}
                {auth.authUser && auth.authUser.profilePhotoFile ? (
                  <img
                    className="nb-right-menu-profile-pic"
                    src={
                      "data:image/png;base64, " + auth.authUser.profilePhotoFile
                    }
                  />
                ) : (
                  <AiOutlineUser className="nb-right-menu-profile--no-pic" />
                )}
                <div className="nb-right-menu-profile-text-container">
                  <div className="nb-right-menu-profile-text">
                    {auth.authUser ? auth.authUser.firstName : ""}{" "}
                    {auth.authUser ? auth.authUser.lastName : ""}{" "}
                  </div>
                  <div
                    className="nb-right-menu-profile-text"
                    style={{
                      fontSize: "14px",
                      marginTop: "-3px",
                      color: "#7a7a8f",
                      fontWeight: "500",
                    }}
                  >
                    Edit Profile
                  </div>
                </div>
              </li>
            </NavLink>

            <li>
              <div className="nb-language-container">
                <select
                  onChange={(e) => onChangeLanguage(e.target.value)}
                  className="nb-language-selector"
                >
                  <option value="tr" onClick={() => onChangeLanguage("tr")}>
                    TR
                  </option>
                  <option value="en" onClick={() => onChangeLanguage("en")}>
                    EN
                  </option>
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const NavbarWithTransation = withTranslation()(Navbar);
export default NavbarWithTransation;
