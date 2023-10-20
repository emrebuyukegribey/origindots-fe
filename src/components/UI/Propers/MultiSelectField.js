import { Input, Select } from "antd";
import "./MultiSelectField.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";

function MultiSelectField({ title, description, placeholder }) {
  return (
    <div className="input-field-outer-container">
      <div className="input-field-container">
        <div className="input-field-title-container">
          <span className="input-field-title">{title}</span>
        </div>
        <Select
          placeholder={placeholder}
          options={[{ value: "Select1" }, { value: "Select2" }]}
        />
        <span className="input-field-description">{description}</span>
      </div>
      <div className="input-field-icons-container">
        <div className="input-field-edit-icon-container">
          <BiEditAlt className="input-field-edit-icon" />
        </div>
        <div className="input-field-delete-icon-container">
          <AiOutlineDelete className="input-field-delete-icon" />
        </div>
      </div>
    </div>
  );
}

export default MultiSelectField;
