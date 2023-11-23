import { Input, Upload } from "antd";
import "./PhotoFieldPreview.css";
import { AiOutlineUpload } from "react-icons/ai";
import { HiOutlinePhoto } from "react-icons/hi2";

function PhotoFieldPreview({ proper }) {
  return (
    <div className="photoFieldPreview-container">
      <div className="photoFieldPreview-name">{proper.title}</div>
      <div className="photoFieldPreview-input">
        <Upload size="large">
          <div className="photoFieldPreview-upload-icon-container">
            <HiOutlinePhoto className="photoFieldPreview-upload-icon" />
            <div className="photoFieldPreview-upload-text">
              {proper.placeholder}
            </div>
          </div>
        </Upload>
      </div>
      <div className="photoFieldPreview-description">{proper.description}</div>
    </div>
  );
}

export default PhotoFieldPreview;
