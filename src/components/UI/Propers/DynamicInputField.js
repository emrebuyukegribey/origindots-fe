import { Input } from "antd";
import "./DynamicInputField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";
import { BsCursorText } from "react-icons/bs";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

function DynamicInputField({ proper, deleteProper, editProper, t }) {
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    const temp = [...inputs];
    const uniqueId = `input-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const input = { id: uniqueId };
    temp.push(input);
    setInputs(temp);
  }, []);

  const addField = () => {
    const uniqueId = `input-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newInput = { id: uniqueId };
    const tempInputs = inputs;
    tempInputs.push(newInput);
    setInputs(tempInputs);
  };

  return (
    <div className="dynamic-input-field-outer-container">
      <div className="dynamic-input-field-drag-icon-container">
        <RiDraggable className="dynamic-input-field-drag-icon" />
      </div>
      <div className="dynamic-input-field-container">
        <div className="dynamic-input-field-title-container">
          <div style={{ display: "flex" }}>
            <div className="dynamic-input-field-icon">
              {proper.icon ? proper.icon : <BsCursorText />}
            </div>
            <span className="dynamic-input-field-title">
              {t(proper.title)}
              {proper.required && (
                <span className="dynamic-input-field-required">*</span>
              )}
            </span>
          </div>
          <div className="dynamic-input-field-icons-container">
            <div
              className="dynamic-input-field-edit"
              onClick={() => editProper(proper)}
            >
              <BiEditAlt className="dynamic-input-field-edit-icon" />
            </div>
            <div
              className="dynamic-input-field-delete"
              onClick={() => deleteProper(proper)}
            >
              <AiOutlineClose className="dynamic-input-field-delete-icon" />
            </div>
          </div>
        </div>
        <div className="dynamic-input-field-inputs-container">
          {inputs.map((f) => (
            <div className="dynamic-input-field-input-container">
              <Input />
              <div className="dynamic-input-field-delete-container">
                <MdDeleteForever className="dynamic-input-field--input-delete-icon" />
              </div>
            </div>
          ))}
        </div>

        <div className="dynamic-input-field-add-field-container">
          <div
            className="dynamic-input-field-add-field-button"
            onClick={addField}
          >
            Add New Field
          </div>
        </div>

        <span className="dynamic-input-field-description">
          {t(proper.description)}
        </span>
      </div>
    </div>
  );
}

export default DynamicInputField;
