import { Input, QRCode, Upload } from "antd";
import "./QRFieldPreview.css";
import { AiOutlineUpload } from "react-icons/ai";

function QRFieldPreview({ proper }) {
  return (
    <div className="qrFieldPreview-container">
      <div className="qrFieldPreview-name">{proper.title}</div>
      <div className="qrFieldPreview-input">
        <QRCode value={"" || "-"} />
      </div>
      <div className="qrFieldPreview-description">{proper.description}</div>
    </div>
  );
}

export default QRFieldPreview;
