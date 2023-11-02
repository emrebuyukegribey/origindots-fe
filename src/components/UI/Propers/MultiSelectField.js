import { Checkbox } from "antd";
import "./MultiSelectField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";
import { MainContext, useContext } from "../../../context";

function MultiSelectField({ proper, deleteProper, editProper }) {
  const { properValueList } = useContext(MainContext);

  return (
    <div className="multi-select-field-outer-container">
      <div className="multi-select-field-drag-icon-container">
        <RiDraggable className="multi-select-field-drag-icon" />
      </div>
      <div className="multi-select-field-container">
        <div className="multi-select-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="multi-select-field-icon">{proper.icon}</div>
            <span className="multi-select-field-title">{proper.title}</span>
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
          {properValueList
            .filter((p) => p.properId === proper.id)
            .map((p) => {
              return <Checkbox value={p.name}>{p.name}</Checkbox>;
            })}
        </div>
        <span className="multi-select-field-description">
          {proper.description}
        </span>
      </div>
    </div>
  );
}

export default MultiSelectField;
