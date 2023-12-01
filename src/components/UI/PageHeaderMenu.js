import HeaderSearchInput from "./HeaderSearchInput";

function PageHeaderMenu(props) {
  return (
    <div className="page-header-menu-container">
      <div style={{ marginRight: "40px" }}>
        <DarkButtonBorder
          text={props.t(props.buttonText("Create User"))}
          onClick={props.onClick}
        />
      </div>
      <HeaderSearchInput
        onChange={props.searchOnChange}
        placeholder={props.searchPlaceholde}
      />
    </div>
  );
}

export default PageHeaderMenu;
