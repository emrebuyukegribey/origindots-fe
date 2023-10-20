import { InputNumber } from "antd";
import "./NumberField.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";

function NumberField({ title, description, placeholder }) {
  return (
    <div className="number-field-outer-container">
      <div className="number-field-container">
        <div className="number-field-title-container">
          <span className="number-field-title">{title}</span>
        </div>
        <InputNumber
          placeholder={placeholder}
          className="number-field-input"
          size="large"
          disabled
        />
        <span className="number-field-description">{description}</span>
      </div>
      <div className="number-field-icons-container">
        <div className="number-field-edit-icon-container">
          <BiEditAlt className="number-field-edit-icon" />
        </div>
        <div className="number-field-delete-icon-container">
          <AiOutlineDelete className="number-field-delete-icon" />
        </div>
      </div>
    </div>
  );
}

export default NumberField;
