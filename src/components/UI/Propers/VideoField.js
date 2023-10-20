import { Upload } from "antd";
import "./VideoField.css";
import { AiOutlineDelete, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";

function VideoField({ title, description, placeholder }) {
  return (
    <div className="video-field-outer-container">
      <div className="video-field-container">
        <div className="video-field-title-container">
          <span className="video-field-title">{title}</span>
        </div>

        <Upload disabled size="large">
          <div className="video-field-upload-icon-container">
            <AiOutlineVideoCameraAdd className="video-field-upload-icon" />
            <div className="video-field-upload-text">{placeholder}</div>
          </div>
        </Upload>
        <span className="video-field-description">{description}</span>
      </div>
      <div className="video-field-icons-container">
        <div className="video-field-edit-icon-container">
          <BiEditAlt className="video-field-edit-icon" />
        </div>
        <div className="video-field-delete-icon-container">
          <AiOutlineDelete className="video-field-delete-icon" />
        </div>
      </div>
    </div>
  );
}

export default VideoField;
