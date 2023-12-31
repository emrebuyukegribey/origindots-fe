import { InputNumber } from "antd";
import "./NumberField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";
import { GoNumber } from "react-icons/go";

function NumberField({ proper, deleteProper, editProper, t }) {
  return (
    <div className="number-field-outer-container">
      <div className="number-field-drag-icon-container">
        <RiDraggable className="number-field-drag-icon" />
      </div>
      <div className="number-field-container">
        <div className="number-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="number-field-icon">
              {proper.icon ? proper.icon : <GoNumber />}
            </div>
            <span className="number-field-title">
              {t(proper.title)}
              {proper.required && (
                <span className="number-field-required">*</span>
              )}
            </span>
          </div>
          <div className="number-field-icons-container">
            <div
              className="number-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="number-field-edit-icon" />
            </div>
            <div
              className="number-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="number-field-delete-icon" />
            </div>
          </div>
        </div>
        <InputNumber
          placeholder={t(proper.placeholder)}
          disabled
          size="large"
        />
        <span className="number-field-description">
          {t(proper.description)}
        </span>
      </div>
    </div>
  );
}

export default NumberField;
