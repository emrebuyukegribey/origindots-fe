import { Upload } from "antd";
import "./VideoField.css";
import { AiOutlineClose, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";

function VideoField({ proper, deleteProper, editProper, t }) {
  return (
    <div className="photo-field-outer-container">
      <div className="photo-field-drag-icon-container">
        <RiDraggable className="photo-field-drag-icon" />
      </div>
      <div className="photo-field-container">
        <div className="photo-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="photo-field-icon">
              {proper.icon ? proper.icon : <AiOutlineVideoCameraAdd />}
            </div>
            <span className="photo-field-title">
              {t(proper.title)}
              {proper.required && (
                <span className="video-field-required">*</span>
              )}
            </span>
          </div>
          <div className="photo-field-icons-container">
            <div
              className="photo-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="photo-field-edit-icon" />
            </div>
            <div
              className="photo-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="photo-field-delete-icon" />
            </div>
          </div>
        </div>
        <Upload disabled size="large">
          <div className="photo-field-upload-icon-container">
            <AiOutlineVideoCameraAdd className="photo-field-upload-icon" />
            <div className="photo-field-upload-text">
              {t(proper.placeholder)}
            </div>
          </div>
        </Upload>
        <span className="photo-field-description">{t(proper.description)}</span>
      </div>
    </div>
  );
}

export default VideoField;
