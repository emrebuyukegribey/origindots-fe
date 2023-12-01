import DarkButtonBorder from "./Buttons/DarkButtonBorder";
import HeaderSearchInput from "./HeaderSearchInput";

import "./PageHeaderMenu.css";

function PageHeaderMenu(props) {
  return (
    <div className="page-header-menu-container">
      <div style={{ marginRight: "40px" }}>
        <DarkButtonBorder
          text={props.buttonText}
          onClick={props.buttonOnClick}
        />
      </div>
      <HeaderSearchInput
        onChange={props.searchOnChange}
        placeholder={props.searchPlaceholder}
        searchOnChange={props.searchOnChange}
      />
    </div>
  );
}

export default PageHeaderMenu;
