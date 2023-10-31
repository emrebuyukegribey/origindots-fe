import { QRCode } from "antd";
import "./QRField.css";
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";

function QRField({  proper, deleteProper, editProper  }) {
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
        <div className="data-field-upload-icon-container">
          <QRCode value={"" || "-"} />
        </div>
        <span className="data-field-description">{proper.description}</span>
      </div>
    </div>
  );
}

export default QRField;
