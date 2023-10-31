import { Input } from "antd";
import "./HeaderField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";

function HeaderField({ proper, deleteProper, editProper }) {
  return (
    <div className="header-field-outer-container">
    <div className="header-field-drag-icon-container">
      <RiDraggable className="header-field-drag-icon" />
    </div>
    <div className="header-field-container">
      <div className="header-field-title-container">
        <div style={{display: "flex"}}>
          <div className="header-field-icon">{proper.icon}</div>
          <span className="header-field-title">{proper.title}</span>
        </div>
        <div className="header-field-icons-container">
          <div
            className="header-field-edit"
            onClick={() => editProper(proper)}
          >
            <BiEditAlt className="header-field-edit-icon" />
          </div>
          <div
            className="header-field-delete"
            onClick={() => deleteProper(proper)}
          >
            <AiOutlineClose className="header-field-delete-icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default HeaderField;
