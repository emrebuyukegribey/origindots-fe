import { InputNumber } from "antd";
import "./NumberField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";

function NumberField({ proper, deleteProper, editProper }) {
  return (
    <div className="number-field-outer-container">
      <div className="number-field-drag-icon-container">
        <RiDraggable className="number-field-drag-icon" />
      </div>
      <div className="number-field-container">
        <div className="number-field-title-container">
          <div style={{display: "flex"}}>
            <div className="number-field-icon">{proper.icon}</div>
            <span className="number-field-title">{proper.title}</span>
          </div>
          <div className="number-field-icons-container">
            <div
              className="number-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="number-field-edit-icon" />
            </div>
            <div
              className="number-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="number-field-delete-icon" />
            </div>
          </div>
        </div>
        <InputNumber placeholder={proper.placeholder} disabled size="large" />
        <span className="number-field-description">{proper.description}</span>
      </div>
    </div>
  );
}

export default NumberField;
