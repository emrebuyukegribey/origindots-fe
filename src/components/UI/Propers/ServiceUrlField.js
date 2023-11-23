import { Input } from "antd";
import "./ServiceUrlField.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";

function ServiceUrlField({ title, description, placeholder, t }) {
  return (
    <div className="service-url-field-outer-container">
      <div className="service-url-field-container">
        <div className="service-url-field-title-container">
          <span className="service-url-field-title">{t(title)}</span>
        </div>
        <Input placeholder={t(placeholder)} disabled size="large" />
        <span className="service-url-field-description">{t(description)}</span>
      </div>
      <div className="service-url-field-icons-container">
        <div className="service-url-field-edit-icon-container">
          <BiEditAlt className="service-url-field-edit-icon" />
        </div>
        <div className="service-url-field-delete-icon-container">
          <AiOutlineDelete className="service-url-field-delete-icon" />
        </div>
      </div>
    </div>
  );
}

export default ServiceUrlField;
