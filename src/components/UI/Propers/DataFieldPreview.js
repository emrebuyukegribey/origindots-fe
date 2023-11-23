import { Input, Upload } from "antd";
import "./DataFieldPreview.css";
import { AiOutlineUpload } from "react-icons/ai";

function DataFieldPreview({ proper }) {
  console.log("proper : ", proper);
  return (
    <div className="dataFieldPreview-container">
      <div className="dataFieldPreview-name">{proper.title}</div>
      <div className="dataFieldPreview-input">
        <Upload size="large">
          <div className="dataFieldPreview-upload-icon-container">
            <AiOutlineUpload className="data-field-upload-icon" />
            <div className="dataFieldPreview-upload-text">
              {proper.placeholder}
            </div>
          </div>
        </Upload>
      </div>
      <div className="dataFieldPreview-description">{proper.description}</div>
    </div>
  );
}

export default DataFieldPreview;
