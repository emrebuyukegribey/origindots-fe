import { Input } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import "./HeaderSearchInput.css";

function HeaderSearchInput(props) {
  return (
    <div className="page-header-search-container">
      <Input
        className="page-header-search-input"
        placeholder={props.searchPlaceholder}
        onChange={props.searchOnChange}
      />
      <div className="page-header-search-icon-container">
        <IoSearchOutline className="page-header-search-icon" />
      </div>
    </div>
  );
}

export default HeaderSearchInput;
