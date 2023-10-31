import { Upload } from "antd";
import "./DataField.css";
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";

function DataField({ proper, deleteProper, editProper }) {
  return (
    <div className="data-field-outer-container">
      <div className="data-field-drag-icon-container">
        <RiDraggable className="data-field-drag-icon" />
      </div>
      <div className="data-field-container">
        <div className="data-field-title-container">
          <div style={{display: "flex"}}>
            <div className="data-field-icon">{proper.icon}</div>
            <span className="data-field-title">{proper.title}</span>
          </div>
          <div className="data-field-icons-container">
            <div
              className="data-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="data-field-edit-icon" />
            </div>
            <div
              className="data-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="data-field-delete-icon" />
            </div>
          </div>
        </div>
        <Upload disabled size="large">
          <div className="data-field-upload-icon-container">
            <AiOutlineUpload className="data-field-upload-icon" />
            <div className="data-field-upload-text">{proper.placeholder}</div>
          </div>
        </Upload>
        <span className="data-field-description">{proper.description}</span>
      </div>
    </div>
  );
}

export default DataField;
