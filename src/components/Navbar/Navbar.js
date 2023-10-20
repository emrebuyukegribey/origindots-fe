import "./Navbar.css";
import { BiMessageAltDetail, BiSearch } from "react-icons/bi";
import { MdOutlineNotifications } from "react-icons/md";
import { useContext, MainContext } from "../../context";
import { withTranslation } from "react-i18next";

function Navbar(props) {
  const { activeLeftBar, navbarHeaderText } = useContext(MainContext);

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

            <li className="nb-right-menu-profile">
              <img
                alt="profile-pic"
                className="nb-right-menu-profile-pic"
                src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
              />
            </li>

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
