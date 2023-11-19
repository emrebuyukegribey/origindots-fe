import "./InputField.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import "./ProperGroupField.css";
import { RiDraggable } from "react-icons/ri";
import InputField from "./InputField";
import { AiOutlineEye, AiOutlineClose } from "react-icons/ai";

function ProperGroupField({ proper, deleteProper, editProper, properList }) {
  console.log("properList : ", properList);
  let subPropers = [];
  subPropers = properList?.filter((element) => element.parentId === proper.id);

  console.log("subProper : ", subPropers);
  return (
    <div className="photo-field-outer-container">
      <div className="photo-field-drag-icon-container">
        <RiDraggable className="photo-field-drag-icon" />
      </div>
      <div className="photo-field-container">
        <div className="photo-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="photo-field-icon">{proper.icon}</div>
            <span className="photo-field-title">
              {proper.title}{" "}
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
            {
              console.log("p : ", p);
            }
            return (
              <div
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  {p.icon}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  {p.title}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  ({p.type})
                </div>
              </div>
            );
          })}
        </div>
        <span className="photo-field-description">{proper.description}</span>
      </div>
    </div>
  );
}

export default ProperGroupField;
