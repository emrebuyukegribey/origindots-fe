import { Form, Radio, Select } from "antd";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";

function FormSingleselect({ proper, properValueList, onChangeForParent }) {
  let properValues = [];
  properValueList
    .map((value) => value)
    .forEach((element) => {
      const name =
        element.childCount > 0 ? (
          <div
            key={element.name}
            value={element.name}
            style={{
              display: "flex",
            }}
          >
            {element.name}
            <div
              key={element.name}
              value={element.name}
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
          <div key={element.name} value={element.name}>
            {element.name}
          </div>
        );
      const obj = {
        label: name,
        value: element.name,
      };
      properValues.push(obj);
    });

  const [value, setValue] = useState(
    properValueList.filter((pv) => pv.childCount === 0)[0].name
  );

  const onChange = (val) => {
    setValue(val.target.value);
    const value = properValueList.filter((v) => v.name === val.target.value)[0];
    if (value.childCount > 0) {
      onChangeForParent(value);
    }
  };

  return (
    <>
      <Form.Item
        className="form-input-container"
        label={proper.title}
        extra={proper.description}
        name={proper.id}
        initialValue={value}
        value={value}
        rules={[
          { required: proper.required, message: proper.title + " is required" },
        ]}
      >
        <Radio.Group onChange={onChange} value={value}>
          {properValues.map((prop, index) => (
            <Radio size="large" key={index} value={prop.value}>
              {prop.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </>
  );
}

export default FormSingleselect;
