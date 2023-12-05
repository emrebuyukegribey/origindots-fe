import "./InputField.css";
import { BiCodeCurly, BiEditAlt } from "react-icons/bi";
import "./ProperGroupField.css";
import { RiDraggable } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { withTranslation } from "react-i18next";

function ProperGroupField({ proper, deleteProper, editProper, properList, t }) {
  let subPropers = [];
  subPropers = properList?.filter((element) => element.parentId === proper.id);

  return (
    <div className="photo-field-outer-container">
      <div className="photo-field-drag-icon-container">
        <RiDraggable className="photo-field-drag-icon" />
      </div>
      <div className="photo-field-container">
        <div className="photo-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="photo-field-icon">
              {proper.icon ? proper.icon : <BiCodeCurly />}
            </div>
            <span className="photo-field-title">
              {t(proper.title)}
              {proper.isRequired && (
                <span className="photo-field-required">*</span>
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
