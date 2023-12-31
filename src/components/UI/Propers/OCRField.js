import "./OCRField.css";
import { IoMdQrScanner } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";

function OCRField({ proper, deleteProper, editProper, t }) {
  return (
    <div className="ocr-field-outer-container">
      <div className="ocr-field-drag-icon-container">
        <RiDraggable className="ocr-field-drag-icon" />
      </div>
      <div className="ocr-field-container">
        <div className="ocr-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="ocr-field-icon">
              {proper.icon ? proper.icon : <IoMdQrScanner />}
            </div>
            <span className="ocr-field-title">
              {t(proper.title)}
              {proper.required && <span className="ocr-field-required">*</span>}
            </span>
          </div>
          <div className="ocr-field-icons-container">
            <div className="ocr-field-edit" onClick={() => editProper(proper)}>
              <BiEditAlt className="ocr-field-edit-icon" />
            </div>
            <div
              className="ocr-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="ocr-field-delete-icon" />
            </div>
          </div>
        </div>
        <div className="ocr-field-upload-icon-container">
          <IoMdQrScanner className="ocr-field-scanner-icon" />
          {t(proper.placeholder)}
        </div>
        <span className="ocr-field-description">{t(proper.description)}</span>
      </div>
    </div>
  );
}

export default OCRField;
