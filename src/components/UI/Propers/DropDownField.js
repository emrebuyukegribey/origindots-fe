import { Select } from "antd";
import "./DropDownField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";
import { MainContext, useContext } from "../../../context";
import { AiOutlineEye } from "react-icons/ai";

function DropDownField({ proper, deleteProper, editProper }) {
  const { properValueList } = useContext(MainContext);
  let properValues = [];
  properValueList
    ?.filter((element) => element.properId === proper.id)
    .map((value) => value)
    .forEach((element) => {
      const name =
        element.childCount > 0 ? (
          <div
            style={{
              display: "flex",
            }}
          >
            {element.name}
            <div
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
          <div>{element.name}</div>
        );
      const obj = {
        label: name,
        value: element.name,
      };
      properValues.push(obj);
    });

  return (
    <div className="drop-down-field-outer-container">
      <div className="drop-down-field-drag-icon-container">
        <RiDraggable className="drop-down-field-drag-icon" />
      </div>
      <div className="drop-down-field-container">
        <div className="drop-down-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="drop-down-field-icon">{proper.icon}</div>
            <span className="drop-down-field-title">
              {proper.title}{" "}
              {proper.isRequired && (
                <span className="drop-down-field-required">*</span>
              )}
            </span>
          </div>
          <div className="drop-down-field-icons-container">
            <div
              className="drop-down-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="drop-down-field-edit-icon" />
            </div>
            <div
              className="drop-down-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="drop-down-field-delete-icon" />
            </div>
          </div>
        </div>
        <Select
          options={properValues}
          placeholder={proper.placeholder}
        ></Select>

        <span className="drop-down-field-description">
          {proper.description}
        </span>
      </div>
    </div>
  );
}

export default DropDownField;
