import { Upload } from "antd";
import "./DataField.css";
import { AiOutlineDelete, AiOutlineUpload } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";

function DataField({ title, description, placeholder }) {
  return (
    <div className="data-field-outer-container">
      <div className="data-field-container">
        <div className="data-field-title-container">
          <span className="data-field-title">{title}</span>
        </div>

        <Upload disabled size="large">
          <div className="data-field-upload-icon-container">
            <AiOutlineUpload className="data-field-upload-icon" />
            <div className="data-field-upload-text">{placeholder}</div>
          </div>
        </Upload>
        <span className="data-field-description">{description}</span>
      </div>
      <div className="data-field-icons-container">
        <div className="data-field-edit-icon-container">
          <BiEditAlt className="data-field-edit-icon" />
        </div>
        <div className="data-field-delete-icon-container">
          <AiOutlineDelete className="data-field-delete-icon" />
        </div>
      </div>
    </div>
  );
}

export default DataField;
