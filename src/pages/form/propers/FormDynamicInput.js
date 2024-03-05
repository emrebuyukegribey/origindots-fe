import { Form, Input } from "antd";
import "./FormItem.css";
import { getCurrentDate } from "../PFormUtil";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import SmallLoadingBar from "../../../components/UI/Loading/SmallLoadingBar";
import TextArea from "antd/es/input/TextArea";
import { IoMdAdd } from "react-icons/io";

function FormDynamicInput({ proper, addValueOnFormValues, t }) {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState([]);

  const onChange = (e, field) => {
    field.value = e.target.value;
    field.valueCreatedDate = new Date();
    const tempInputs = inputs;
    tempInputs.map((f) => (f.id === field.id ? { ...f, field } : f));
    setInputs(tempInputs);

    const properObject = {
      properId: proper.id,
      properParenId: proper.parentId,
      properName: proper.title,
      properValue: inputs,
      properType: proper.type,
      createdDate: getCurrentDate(),
    };
    addValueOnFormValues(properObject);
  };

  /*
  useEffect(() => {
    setLoading(true);
    if (
      inputs &&
      inputs.filter((input) => input.parentProperId === proper.id).length === 0
    ) {
      const temp = [...inputs];
      const input = { id: 1, parentProperId: proper.id };
      temp.push(input);
      setInputs(temp);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);
  */

  const addField = () => {
    setLoading(true);
    const uniqueId = `dynamic-input-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;

    const field = {
      id: uniqueId,
      parentProperId: proper.id,
      value: "",
      valueCreatedDate: new Date(),
    };

    const tempInputs = inputs;
    tempInputs.push(field);
    setInputs(tempInputs);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const deleteField = (deletedField) => {
    setLoading(true);
    setInputs(inputs.filter((f) => f.id !== deletedField.id));
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  return (
    <>
      <Form.Item
        className="form-input-container"
        label={proper.title}
        extra={proper.description}
        name={proper.id}
        rules={[
          { required: proper.required, message: proper.title + " is required" },
        ]}
      >
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              height: "auto",
              paddingLeft: "100px",
              marginTop: "-75px",
            }}
          >
            <SmallLoadingBar />
          </div>
        )}

        {!loading &&
          inputs
            .filter((field) => field.parentProperId === proper.id)
            .map((f, index) => (
              <div
                className="form-dynamic-input-field-input-container"
                key={index}
              >
                <TextArea
                  style={{ marginBottom: "10px" }}
                  onChange={(e) => onChange(e, f)}
                  defaultValue={f.value}
                />

                <div className="form-dynamic-input-field-delete-container">
                  <MdDeleteForever
                    className="form-dynamic-input-field--input-delete-icon"
                    onClick={() => deleteField(f)}
                  />
                </div>
              </div>
            ))}

        <div
          className="form-dynamic-input-add-field-button-container"
          onClick={addField}
        >
          {t("Add New Field")}
        </div>
      </Form.Item>
    </>
  );
}

export default FormDynamicInput;
