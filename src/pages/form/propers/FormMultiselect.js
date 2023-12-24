import { Checkbox, Col, Form, Radio, Select } from "antd";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";

function FormMultiselect({
  formValues,
  proper,
  allProperList,
  properValueList,
  onChangeForParent,
}) {
  const [value, setValue] = useState(
    properValueList.filter((pv) => pv.childCount === 0)[0].name
  );

  const [touchedRelatedForm, setTouchedRelatedForm] = useState(
    localStorage.getItem(proper.id)
  );

  const onChange = (val) => {
    console.log("val : ", val);
    localStorage.removeItem(proper.id);
    setValue(val);
    const properValue = properValueList.filter((v) => v.name === val)[0];
    console.log("properValue : ", properValue);

    if (properValue.childCount > 0) {
      const childs = [];
      const childOfProperValue = allProperList.filter(
        (p) => p.parentId === properValue.id
      );

      if (childOfProperValue && childOfProperValue.length > 0) {
        formValues.forEach((fv) => {
          const key = Object.keys(fv)[0];
          const value = Object.values(fv)[0];
          childOfProperValue.forEach((p) => {
            if (p.id === key && value && value.length > 0) {
              childs.push(p.parentId);
            }
          });
        });
      }
      localStorage.setItem(proper.id, properValue.id);
      setTouchedRelatedForm(properValue.id);
      onChangeForParent(properValue);
    }
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
    onChangeForParent(value);
  };

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
              {touchedRelatedForm === element.id && (
                <IoMdCheckmark size={20} color="#18bd5b" />
              )}
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
