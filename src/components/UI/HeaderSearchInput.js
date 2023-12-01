import { IoSearchOutline } from "react-icons/io5";

function HeaderSearchInput(props, onChange) {
  return (
    <div className="page-header-search-container">
      <Input
        className="page-header-search-input"
        placeholder={props.t(
          props.placeholder("Please enter something about the user")
        )}
        onChange={onChange}
      />
      <div className="page-header-search-icon-container">
        <IoSearchOutline className="page-header-search-icon" />
      </div>
    </div>
  );
}

export default HeaderSearchInput;
