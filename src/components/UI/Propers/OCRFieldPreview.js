import { Input, Upload } from "antd";
import "./OCRFieldPreview.css";

import { IoMdQrScanner } from "react-icons/io";

function OCRFieldPreview({ proper }) {
  return (
    <div className="ocrFieldPreview-container">
      <div className="ocrFieldPreview-name">{proper.title}</div>
      <div className="ocrFieldPreview-input">
        <Upload size="large">
          <div className="ocrFieldPreview-upload-icon-container">
            <IoMdQrScanner className="ocrFieldPreview-upload-icon" />
            <div className="ocrFieldPreview-upload-text">
              {proper.placeholder}
            </div>
          </div>
        </Upload>
      </div>
      <div className="ocrFieldPreview-description">{proper.description}</div>
    </div>
  );
}

export default OCRFieldPreview;
