import { Input } from "antd";
import "./TextareaField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";
import { BsTextareaResize } from "react-icons/bs";

const { TextArea } = Input;
function TextareaField({ proper, deleteProper, editProper, t }) {
  return (
    <div className="textarea-field-outer-container">
      <div className="textarea-field-drag-icon-container">
        <RiDraggable className="textarea-field-drag-icon" />
      </div>
      <div className="textarea-field-container">
        <div className="textarea-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="textarea-field-icon">
              {proper.icon ? proper.icon : <BsTextareaResize />}
            </div>
            <span className="textarea-field-title">
              {t(proper.title)}
              {proper.isRequired && (
                <span className="textarea-field-required">*</span>
              )}
            </span>
          </div>
          <div className="textarea-field-icons-container">
            <div
              className="textarea-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="textarea-field-edit-icon" />
            </div>
            <div
              className="textarea-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="textarea-field-delete-icon" />
            </div>
          </div>
        </div>
        <TextArea
          row={4}
          maxLength={6}
          placeholder={t(proper.placeholder)}
          disabled
          size="large"
        />
        <span className="textarea-field-description">
          {t(proper.description)}
        </span>
      </div>
    </div>
  );
}

export default TextareaField;
