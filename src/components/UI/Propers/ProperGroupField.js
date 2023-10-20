import "./InputField.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import "./ProperGroupField.css";
import InputField from "./InputField";

function ProperGroupField({ title, placeholder, description }) {
  return (
    <div style={{ width: "100%" }}>
      <span style={{ paddingLeft: "10px" }} className="input-field-title">
        {title}
      </span>

      <div className="input-field-outer-container">
        <div className="input-field-container">
          <div className="input-field-title-container"></div>
          <InputField />
          <InputField />
          <InputField />
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
      <span style={{ paddingLeft: "10px" }} className="input-field-description">
        {description}
      </span>
    </div>
  );
}

export default ProperGroupField;
