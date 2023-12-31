import { Input } from "antd";
import "./InputField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";
import { BsCursorText } from "react-icons/bs";

function InputField({ proper, deleteProper, editProper, t }) {
  return (
    <div className="input-field-outer-container">
      <div className="input-field-drag-icon-container">
        <RiDraggable className="input-field-drag-icon" />
      </div>
      <div className="input-field-container">
        <div className="input-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="input-field-icon">
              {proper.icon ? proper.icon : <BsCursorText />}
            </div>
            <span className="input-field-title">
              {t(proper.title)}
              {proper.required && (
                <span className="input-field-required">*</span>
              )}
            </span>
          </div>
          <div className="input-field-icons-container">
            <div
              className="input-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="input-field-edit-icon" />
            </div>
            <div
              className="input-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="input-field-delete-icon" />
            </div>
          </div>
        </div>
        <Input placeholder={t(proper.placeholder)} disabled size="large" />
        <span className="input-field-description">{t(proper.description)}</span>
      </div>
    </div>
  );
}

export default InputField;
