import { Input } from "antd";
import "./ExplanationField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiCommentDetail, BiEditAlt, BiHeading } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";

function ExplanationField({ proper, deleteProper, editProper, t }) {
  return (
    <div className="explanation-field-outer-container">
      <div className="explanation-field-drag-icon-container">
        <RiDraggable className="explanation-field-drag-icon" />
      </div>
      <div className="explanation-field-container">
        <div className="explanation-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="explanation-field-icon">
              {proper.icon ? proper.icon : <BiCommentDetail />}
            </div>
            <span className="explanation-field-title">{t(proper.title)}</span>
          </div>
          <div className="explanation-field-icons-container">
            <div
              className="explanation-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="explanation-field-edit-icon" />
            </div>
            <div
              className="explanation-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="explanation-field-delete-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplanationField;
