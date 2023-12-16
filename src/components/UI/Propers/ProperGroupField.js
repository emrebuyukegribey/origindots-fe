import "./InputField.css";
import { BiCodeCurly, BiCopy, BiEditAlt } from "react-icons/bi";
import "./ProperGroupField.css";
import { RiDraggable } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { withTranslation } from "react-i18next";
import { IoDuplicateOutline } from "react-icons/io5";
import { GoCopy } from "react-icons/go";
import { MdCopyAll, MdOutlineContentCopy } from "react-icons/md";

function ProperGroupField({
  proper,
  duplicateProper,
  deleteProper,
  editProper,
  properList,
  t,
}) {
  let subPropers = [];
  subPropers = properList?.filter((element) => element.parentId === proper.id);

  return (
    <div className="propergroup-field-outer-container">
      <div className="propergroup-field-drag-icon-container">
        <RiDraggable className="propergroup-field-drag-icon" />
      </div>
      <div className="propergroup-field-container">
        <div className="propergroup-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="propergroup-field-icon">
              {proper.icon ? proper.icon : <BiCodeCurly />}
            </div>
            <span className="propergroup-field-title">
              {t(proper.title)}
              {proper.required && (
                <span className="propergroup-field-required">*</span>
              )}
            </span>
          </div>
          <div className="propergroup-field-icons-container">
            <div
              className="propergroup-field-edit"
              onClick={() => duplicateProper(proper)}
            >
              <IoDuplicateOutline className="propergroup-field-edit-icon" />
            </div>
            <div
              className="propergroup-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="propergroup-field-edit-icon" />
            </div>
            <div
              className="propergroup-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="propergroup-field-delete-icon" />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "5px",
          }}
        >
          {subPropers.map((p) => {
            return (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  border: "1px solid #f1f1f1",
                  marginBottom: "10px",
                  padding: "15px",
                }}
              >
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  {p.icon}
                </div>
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  {p.title}
                </div>
                <div
                  key={p.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  ({p.type})
                </div>
              </div>
            );
          })}
        </div>
        <span className="photo-field-description">{t(proper.description)}</span>
      </div>
    </div>
  );
}

export default ProperGroupField;
