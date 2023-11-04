import { Radio } from "antd";
import "./SingleSelectField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";
import { useState } from "react";
import { MainContext, useContext } from "../../../context";

function SingleSelectField({ proper, deleteProper, editProper }) {
  const { properValueList } = useContext(MainContext);
  const [value, setValue] = useState(
    properValueList && properValueList.length > 0
      ? properValueList.filter((p) => p.properId === proper.id)[0].name
      : ""
  );

  const onChange = (e) => {
    setValue(e.target.value);
  };

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
        {properValueList
          ?.filter((p) => p.properId === proper.id)
          .map((prop) => {
            return (
              <Radio.Group value={value} onChange={onChange}>
                <Radio size="large" value={prop.name}>
                  {prop.name}
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
