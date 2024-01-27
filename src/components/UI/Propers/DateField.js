import { DatePicker } from "antd";
import "./DateField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";

function DateField({ proper, deleteProper, editProper, t }) {
  return (
    <div className="date-field-outer-container">
      <div className="date-field-drag-icon-container">
        <RiDraggable className="date-field-drag-icon" />
      </div>
      <div className="date-field-container">
        <div className="date-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="date-field-icon">
              {proper.icon ? proper.icon : <MdOutlineDateRange />}
            </div>
            <span className="date-field-title">
              {t(proper.title)}
              {proper.required && (
                <span className="date-field-required">*</span>
              )}
            </span>
          </div>
          <div className="date-field-icons-container">
            <div className="date-field-edit" onClick={() => editProper(proper)}>
              <BiEditAlt className="date-field-edit-icon" />
            </div>
            <div
              className="date-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="date-field-delete-icon" />
            </div>
          </div>
        </div>
        <DatePicker placeholder={t(proper.placeholder)} disabled size="large" />
        <span className="date-field-description">{t(proper.description)}</span>
      </div>
    </div>
  );
}

export default DateField;
