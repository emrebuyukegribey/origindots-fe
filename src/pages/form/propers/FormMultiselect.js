import { Checkbox, Col, Form, Radio, Select } from "antd";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";

function FormMultiselect({ proper, properValueList, onChangeForParent }) {
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {element.name}
            <div key={element.name} value={element.name}>
              <AiOutlineEye
                color="#EF4136"
                size={16}
                style={{ margin: "0px 10px" }}
                onClick={() => openRelatedForm(element)}
              />
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
    setValue(val);
    console.log("val : ", val);
    /*
    const valueWithChilds = properValueList.filter((value) => {
      return value.childCount > 0;
    })[0];

    console.log("valueWithChilds : ", valueWithChilds);

    if (val.includes(valueWithChilds.name)) {
      onChangeForParent(valueWithChilds);
    }
    */
  };

  const openRelatedForm = (value) => {
    console.log("value : ", value);
    onChangeForParent(value);
  };

  return (
    <>
      <Form.Item
        className="form-input-container"
        label={proper.title}
        extra={proper.description}
        name={proper.id}
        // initialValue={value}
        value={value}
        rules={[
          { required: proper.required, message: proper.title + " is required" },
        ]}
      >
        <Checkbox.Group
          options={properValues}
          onChange={onChange}
          style={{ display: "flex", flexDirection: "column" }}
        />
      </Form.Item>
    </>
  );
}

export default FormMultiselect;
