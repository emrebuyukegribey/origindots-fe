import "./InputField.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import "./ProperGroupField.css";
import { RiDraggable } from "react-icons/ri";
import InputField from "./InputField";
import { AiOutlineClose } from "react-icons/ai";
import { Input } from "antd";

function ProperGroupField({ proper, deleteProper, editProper }) {
  return (
    <div className="photo-field-outer-container">
      <div className="photo-field-drag-icon-container">
        <RiDraggable className="photo-field-drag-icon" />
      </div>
      <div className="photo-field-container">
        <div className="photo-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="photo-field-icon">{proper.icon}</div>
            <span className="photo-field-title">
              {proper.title}{" "}
              {proper.isRequired && (
                <span className="photo-field-required">*</span>
              )}
            </span>
          </div>
          <div className="photo-field-icons-container">
            <div
              className="photo-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="photo-field-edit-icon" />
            </div>
            <div
              className="photo-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="photo-field-delete-icon" />
            </div>
          </div>
        </div>

        <span className="photo-field-description">{proper.description}</span>
      </div>
    </div>
  );
}

export default ProperGroupField;
