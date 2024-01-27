import { Checkbox } from "antd";
import "./MultiSelectField.css";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { BiEditAlt, BiSelectMultiple } from "react-icons/bi";
import { RiDraggable, RiMenu2Fill } from "react-icons/ri";

function MultiSelectField({
  proper,
  deleteProper,
  editProper,
  properValueList,
  t,
}) {
  let properValues = [];
  properValueList
    ?.filter((element) => element.properId === proper.id)
    .map((value) => value)
    .forEach((element) => {
      const name =
        element.childCount > 0 ? (
          <div
            key={element.id + element.listNo + element.name}
            style={{
              display: "flex",
            }}
          >
            {element.name}
            <div
              key={element.id + element.listNo + element.name}
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <AiOutlineEye />
            </div>
          </div>
        ) : (
          <div key={element.id + element.listNo + element.name}>
            {element.name}
          </div>
        );
      const obj = {
        label: name,
        value: element.name,
      };
      properValues.push(obj);
    });

  return (
    <div className="multi-select-field-outer-container">
      <div className="multi-select-field-drag-icon-container">
        <RiDraggable className="multi-select-field-drag-icon" />
      </div>
      <div className="multi-select-field-container">
        <div className="multi-select-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="multi-select-field-icon">
              {proper.icon ? proper.icon : <BiSelectMultiple />}
            </div>
            <span className="multi-select-field-title">
              {t(proper.title)}
              {proper.required && (
                <span className="multi-select-field-required">*</span>
              )}
            </span>
          </div>
          <div className="multi-select-field-icons-container">
            <div
              className="multi-select-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="multi-select-field-edit-icon" />
            </div>
            <div
              className="multi-select-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="multi-select-field-delete-icon" />
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "5px" }}
        >
          {properValues.map((p) => {
            return (
              <div style={{ display: "flex" }} key={p.id + p.listNo + p.name}>
                <Checkbox key={p.id + p.listNo + p.name}>{p.label}</Checkbox>
              </div>
            );
          })}
        </div>
        <span className="multi-select-field-description">
          {t(proper.description)}
        </span>
      </div>
    </div>
  );
}

export default MultiSelectField;
