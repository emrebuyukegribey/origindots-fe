import "./InputField.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import "./ProperGroupField.css";
import { RiDraggable } from "react-icons/ri";
import InputField from "./InputField";
import { AiOutlineClose } from "react-icons/ai";

function ProperGroupField({ proper, deleteProper, editProper }) {
  return (
    <div className="propergroup-field-outer-container">
      <div className="propergroup-field-drag-icon-container">
        <RiDraggable className="propergroup-field-drag-icon" />
      </div>
      <div className="propergroup-field-container">
        <div className="propergroup-field-title-container">
          <span className="propergroup-field-title">
            {proper.title}{" "}
            {proper.isRequired && (
              <span className="propergroup-field-required">*</span>
            )}
          </span>
          <div className="propergroup-field-icons-container">
            <div
              className="propergroup-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="propergroup-field-edit-icon" />
            </div>
            <div
              className="propergroup-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="propergroup-field-delete-icon" />
            </div>
          </div>
        </div>
        <div className="propergroup-field-content"></div>
        <span className="propergroup-field-description">
          {proper.description}
        </span>
      </div>
    </div>
  );
}

export default ProperGroupField;
