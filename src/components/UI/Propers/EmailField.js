import { Input } from "antd";
import "./EmailField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";

function EmailField({ proper, deleteProper, editProper }) {
  return (
    <div className="email-field-outer-container">
      <div className="email-field-drag-icon-container">
        <RiDraggable className="email-field-drag-icon" />
      </div>
      <div className="email-field-container">
        <div className="email-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="email-field-icon">{proper.icon}</div>
            <span className="email-field-title">{proper.title}</span>
          </div>
          <div className="email-field-icons-container">
            <div
              className="email-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="email-field-edit-icon" />
            </div>
            <div
              className="email-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="email-field-delete-icon" />
            </div>
          </div>
        </div>
        <Input placeholder={proper.placeholder} disabled size="large" />
        <span className="email-field-description">{proper.description}</span>
      </div>
    </div>
  );
}

export default EmailField;
