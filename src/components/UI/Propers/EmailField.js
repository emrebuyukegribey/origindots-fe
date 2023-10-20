import { Input } from "antd";
import "./EmailField.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";

function EmailField({ title, description, placeholder }) {
  return (
    <div className="email-field-outer-container">
      <div className="email-field-container">
        <div className="email-field-title-container">
          <span className="email-field-title">{title}</span>
        </div>
        <Input placeholder={placeholder} disabled size="large" />
        <span className="email-field-description">{description}</span>
      </div>
      <div className="email-field-icons-container">
        <div className="email-field-edit-icon-container">
          <BiEditAlt className="email-field-edit-icon" />
        </div>
        <div className="email-field-delete-icon-container">
          <AiOutlineDelete className="email-field-delete-icon" />
        </div>
      </div>
    </div>
  );
}

export default EmailField;
