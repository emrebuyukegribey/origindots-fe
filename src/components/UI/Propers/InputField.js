import { Input } from "antd";
import "./InputField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";

function InputField({ proper, deleteProper, editProper }) {
  return (
    <div className="input-field-outer-container">
      <div className="input-field-drag-icon-container">
        <RiDraggable className="input-field-drag-icon" />
      </div>
      <div className="input-field-container">
        <div className="input-field-title-container">
          <span className="input-field-title">{proper.title}</span>
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
        <Input placeholder={proper.placeholder} disabled size="large" />
        <span className="input-field-description">{proper.description}</span>
      </div>
    </div>
  );
}

export default InputField;
