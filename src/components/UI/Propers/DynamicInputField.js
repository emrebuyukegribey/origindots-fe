import { Input } from "antd";
import "./DynamicInputField.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDraggable } from "react-icons/ri";
import { BsCursorText } from "react-icons/bs";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import LoadingBar from "../Loading/LoadingBar";
import SmallLoadingBar from "../Loading/SmallLoadingBar";
import TextArea from "antd/es/input/TextArea";

function DynamicInputField({
  proper,
  deleteProper,
  editProper,
  t,
  dynamicInputs,
  setDynamicInputs,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (
      dynamicInputs &&
      dynamicInputs.filter((input) => input.parentProperId === proper.id)
        .length === 0
    ) {
      const temp = [...dynamicInputs];
      const input = { id: 1, parentProperId: proper.id };
      temp.push(input);
      setDynamicInputs(temp);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const addField = () => {
    setLoading(true);
    const uniqueId = `input-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newInput = { id: uniqueId, parentProperId: proper.id };
    const tempInputs = dynamicInputs;
    tempInputs.push(newInput);
    setDynamicInputs(tempInputs);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const deleteField = (id) => {
    const tempList = dynamicInputs;
    tempList.pop(deleteField);
    setDynamicInputs(tempList);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
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
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                paddingLeft: "100px",
                position: "initial",
              }}
            >
              <SmallLoadingBar />
            </div>
          )}
          {!loading &&
            dynamicInputs
              .filter((input) => input.parentProperId === proper.id)
              .map((f, index) => (
                <div
                  className="dynamic-input-field-input-container"
                  key={index}
                >
                  <TextArea
                    style={{
                      marginBottom: "10px",
                    }}
                  />

                  <div className="dynamic-input-field-delete-container">
                    <MdDeleteForever
                      className="dynamic-input-field--input-delete-icon"
                      onClick={() => deleteField(f.id)}
                    />
                  </div>
                </div>
              ))}
        </div>

        <div className="dynamic-input-field-add-field-container">
          <div
            className="dynamic-input-field-add-field-button"
            onClick={loading ? {} : addField}
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
