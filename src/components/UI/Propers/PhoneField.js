import { InputNumber } from "antd";
import "./PhoneField.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";

function PhoneField({ title, description, placeholder }) {
  return (
    <div className="phone-field-outer-container">
      <div className="phone-field-container">
        <div className="phone-field-title-container">
          <span className="phone-field-title">{title}</span>
        </div>
        <InputNumber
          placeholder={placeholder}
          className="phone-field-input"
          size="large"
          disabled
        />
        <span className="phone-field-description">{description}</span>
      </div>
      <div className="phone-field-icons-container">
        <div className="phone-field-edit-icon-container">
          <BiEditAlt className="phone-field-edit-icon" />
        </div>
        <div className="phone-field-delete-icon-container">
          <AiOutlineDelete className="phone-field-delete-icon" />
        </div>
      </div>
    </div>
  );
}

export default PhoneField;
