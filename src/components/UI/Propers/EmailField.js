import { Input } from "antd";
import "./EmailField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";

function EmailField({ proper, deleteProper, editProper, t }) {
  return (
    <div className="email-field-outer-container">
      <div className="email-field-drag-icon-container">
        <RiDraggable className="email-field-drag-icon" />
      </div>
      <div className="email-field-container">
        <div className="email-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="email-field-icon">
              {proper.icon ? proper.icon : <MdAlternateEmail />}
            </div>
            <span className="email-field-title">
              {t(proper.title)}
              {proper.required && (
                <span className="email-field-required">*</span>
              )}
            </span>
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
        <Input placeholder={t(proper.placeholder)} disabled size="large" />
        <span className="email-field-description">{t(proper.description)}</span>
      </div>
    </div>
  );
}

export default EmailField;
