import { QRCode } from "antd";
import "./QRField.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";

function QRField({ title, description, placeholder }) {
  return (
    <div className="qr-field-outer-container">
      <div className="qr-field-container">
        <div className="qr-field-title-container">
          <span className="qr-field-title">{title}</span>
        </div>
        <QRCode value={"" || "-"} />

        <span className="qr-field-description">{description}</span>
      </div>
      <div className="qr-field-icons-container">
        <div className="qr-field-edit-icon-container">
          <BiEditAlt className="qr-field-edit-icon" />
        </div>
        <div className="qr-field-delete-icon-container">
          <AiOutlineDelete className="qr-field-delete-icon" />
        </div>
      </div>
    </div>
  );
}

export default QRField;
