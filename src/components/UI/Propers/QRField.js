import { QRCode } from "antd";
import "./QRField.css";
import {
  AiOutlineClose,
  AiOutlineQrcode,
  AiOutlineUpload,
} from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";

function QRField({ proper, deleteProper, editProper, t }) {
  return (
    <div className="qr-field-outer-container">
      <div className="qr-field-drag-icon-container">
        <RiDraggable className="qr-field-drag-icon" />
      </div>
      <div className="qr-field-container">
        <div className="qr-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="qr-field-icon">
              {proper.icon ? proper.icon : <AiOutlineQrcode />}
            </div>
            <span className="qr-field-title">
              {t(proper.title)}
              {proper.isRequired && (
                <span className="qr-field-required">*</span>
              )}
            </span>
          </div>
          <div className="qr-field-icons-container">
            <div className="qr-field-edit" onClick={() => editProper(proper)}>
              <BiEditAlt className="qr-field-edit-icon" />
            </div>
            <div
              className="qr-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="qr-field-delete-icon" />
            </div>
          </div>
        </div>
        <div className="qr-field-upload-icon-container">
          <QRCode value={"" || "-"} />
        </div>
        <span className="qr-field-description">{t(proper.description)}</span>
      </div>
    </div>
  );
}

export default QRField;
