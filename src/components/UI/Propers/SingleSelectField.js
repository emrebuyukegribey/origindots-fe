import { Radio } from "antd";
import "./SingleSelectField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";

import { AiOutlineEye } from "react-icons/ai";

function SingleSelectField({
  proper,
  deleteProper,
  editProper,
  properValueList,
}) {
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
    <div className="single-select-field-outer-container">
      <div className="single-select-field-drag-icon-container">
        <RiDraggable className="single-select-field-drag-icon" />
      </div>
      <div className="single-select-field-container">
        <div className="single-select-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="single-select-field-icon">{proper.icon}</div>
            <span className="single-select-field-title">
              {proper.title}{" "}
              {proper.isRequired && (
                <span className="single-select-field-required">*</span>
              )}
            </span>
          </div>
          <div className="single-select-field-icons-container">
            <div
              className="single-select-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="single-select-field-edit-icon" />
            </div>
            <div
              className="single-select-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="single-select-field-delete-icon" />
            </div>
          </div>
        </div>
        {properValues.map((prop) => {
          return (
            <Radio.Group value={properValues[0].value}>
              <Radio size="large" value={prop.value}>
                {prop.label}
              </Radio>
            </Radio.Group>
          );
        })}
        <span className="single-select-field-description">
          {proper.description}
        </span>
      </div>
    </div>
  );
}

export default SingleSelectField;
