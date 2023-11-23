import { InputNumber } from "antd";
import "./PhoneField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";

function PhoneField({ proper, deleteProper, editProper, t }) {
  return (
    <div className="phone-field-outer-container">
      <div className="phone-field-drag-icon-container">
        <RiDraggable className="phone-field-drag-icon" />
      </div>
      <div className="phone-field-container">
        <div className="phone-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="phone-field-icon">{proper.icon}</div>
            <span className="phone-field-title">
              {t(proper.title)}
              {proper.isRequired && (
                <span className="phone-field-required">*</span>
              )}
            </span>
          </div>
          <div className="phone-field-icons-container">
            <div
              className="phone-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="phone-field-edit-icon" />
            </div>
            <div
              className="phone-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="phone-field-delete-icon" />
            </div>
          </div>
        </div>

        <InputNumber
          placeholder={t(proper.placeholder)}
          disabled
          size="large"
        />
        <span className="phone-field-description">{t(proper.description)}</span>
      </div>
    </div>
  );
}

export default PhoneField;
