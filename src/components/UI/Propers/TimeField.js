import { TimePicker } from "antd";
import "./TimeField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";

function TimeField({ proper, deleteProper, editProper}) {
  return (

    <div className="time-field-outer-container">
      <div className="time-field-drag-icon-container">
        <RiDraggable className="time-field-drag-icon" />
      </div>
      <div className="time-field-container">
        <div className="time-field-title-container">
          <div style={{display: "flex"}}>
            <div className="time-field-icon">{proper.icon}</div>
            <span className="time-field-title">{proper.title}</span>
          </div>
          <div className="time-field-icons-container">
            <div
              className="time-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="time-field-edit-icon" />
            </div>
            <div
              className="time-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="time-field-delete-icon" />
            </div>
          </div>
        </div>
        <TimePicker placeholder={proper.placeholder} disabled size="large" />
        <span className="time-field-description">{proper.description}</span>
      </div>
    </div>
    
  );
}

export default TimeField;
