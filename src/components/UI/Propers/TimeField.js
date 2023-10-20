import { TimePicker } from "antd";
import "./TimeField.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";

function TimeField({ title, description, placeholder }) {
  return (
    <div className="time-field-outer-container">
      <div className="time-field-container">
        <div className="time-field-title-container">
          <span className="time-field-title">{title}</span>
        </div>
        <TimePicker placeholder={placeholder} disabled size="large" />
        <span className="time-field-description">{description}</span>
      </div>
      <div className="time-field-icons-container">
        <div className="time-field-edit-icon-container">
          <BiEditAlt className="time-field-edit-icon" />
        </div>
        <div className="time-field-delete-icon-container">
          <AiOutlineDelete className="time-field-delete-icon" />
        </div>
      </div>
    </div>
  );
}

export default TimeField;
