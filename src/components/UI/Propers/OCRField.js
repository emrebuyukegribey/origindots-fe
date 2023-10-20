import { Input } from "antd";
import "./OCRField.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";

function OCRField({ title, description, placeholder }) {
  return (
    <div className="ocr-field-outer-container">
      <div className="ocr-field-container">
        <div className="ocr-field-title-container">
          <span className="ocr-field-title">{title}</span>
        </div>
        <Input placeholder={placeholder} disabled size="large" />
        <span className="ocr-field-description">{description}</span>
      </div>
      <div className="ocr-field-icons-container">
        <div className="ocr-field-edit-icon-container">
          <BiEditAlt className="ocr-field-edit-icon" />
        </div>
        <div className="ocr-field-delete-icon-container">
          <AiOutlineDelete className="ocr-field-delete-icon" />
        </div>
      </div>
    </div>
  );
}

export default OCRField;
