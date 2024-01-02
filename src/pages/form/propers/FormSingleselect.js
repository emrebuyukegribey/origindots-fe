import { Form, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import { getCurrentDate } from "../PFormUtil";

function FormSingleselect({
  addValueOnFormValues,
  formValues,
  proper,
  allProperList,
  properValueList,
  onChangeForParent,
}) {
  const [value, setValue] = useState(
    properValueList && properValueList.length > 0
      ? properValueList.filter((pv) => pv.childCount === 0)[0].name
      : ""
  );

  const [touchedRelatedForm, setTouchedRelatedForm] = useState(
    localStorage.getItem(proper.id)
  );

  const onChange = (val) => {
    setTouchedRelatedForm(null);
    localStorage.removeItem(proper.id);
    setValue(val.target.value);
    const selectedValue = setSelectedValueInStorage(val);

    if (selectedValue.childCount > 0) {
      const childsOfProperValue = findChildsOfSelectedValue(selectedValue);
      findTouchedValue(selectedValue, childsOfProperValue);
      onChangeForParent(selectedValue);
    }

    const properObject = {
      properId: proper.id,
      properParenId: proper.parentId,
      properName: proper.title,
      properValue: val.target.value,
      properValueId: JSON.parse(
        localStorage.getItem(proper.id + "selectedValue")
      ).id,
      properType: proper.type,
      createdDate: getCurrentDate(),
    };
    addValueOnFormValues(properObject);
  };

  const setSelectedValueInStorage = (val) => {
    const properValue = properValueList.filter(
      (v) => v.name === val.target.value && v.properId === proper.id
    )[0];
    if (properValue) {
      localStorage.setItem(
        proper.id + "selectedValue",
        JSON.stringify(properValue)
      );
    }

    return properValue;
  };

  const findChildsOfSelectedValue = (selectedValue) => {
    const childsOfProperValue = allProperList.filter(
      (p) => p.parentId === selectedValue.id
    );

    return childsOfProperValue;
  };

  const findKeyInFormValues = (childsOfProperValue) => {
    let foundKey;
    if (formValues && formValues.length > 0) {
      formValues.forEach((fv) => {
        childsOfProperValue.forEach((c) => {
          if (Object.keys(fv)[0] === c.id) {
            foundKey = c.id;
            return;
          }
        });
      });
    }

    return foundKey;
  };

  const findValueInFormValues = (childsOfProperValue) => {
    let foundValue;
    if (formValues && formValues.length > 0) {
      formValues.forEach((fv) => {
        childsOfProperValue.forEach((c) => {
          if (Object.keys(fv)[0] === c.id) {
            foundValue = Object.values(fv)[0];
            return;
          }
        });
      });
    }

    return foundValue;
  };

  const findTouchedValue = (selectedValue, childsOfProperValue) => {
    if (childsOfProperValue && childsOfProperValue.length > 0) {
      const key = findKeyInFormValues(childsOfProperValue);
      const value = findValueInFormValues(childsOfProperValue);
      childsOfProperValue.forEach((p) => {
        if (p.id === key && value && value.length > 0) {
          localStorage.setItem(proper.id, selectedValue.id);
          setTouchedRelatedForm(selectedValue.id);
        } else {
          localStorage.removeItem(proper.id);
          setTouchedRelatedForm(null);
        }
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem(proper.id + "selectedValue")) {
        const selectedValue = JSON.parse(
          localStorage.getItem(proper.id + "selectedValue")
        );
        const childsOfProperValue = findChildsOfSelectedValue(selectedValue);
        findTouchedValue(selectedValue, childsOfProperValue);
      } else {
        setTouchedRelatedForm(null);
      }
    }, 200);
  }, []);

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
          <Space direction="vertical">
            {properValueList
              .filter((v) => v.properId === proper.id)
              .map((prop, index) => (
                <Radio size="large" key={index} value={prop.name}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {prop.name}{" "}
                    {prop.childCount > 0 && (
                      <div>
                        <AiOutlineEye
                          color="#EF4136"
                          size={16}
                          style={{ margin: "0px 10px" }}
                        />

                        {touchedRelatedForm === prop.id && (
                          <IoMdCheckmark size={20} color="#18bd5b" />
                        )}
                      </div>
                    )}
                  </div>
                </Radio>
              ))}
          </Space>
        </Radio.Group>
      </Form.Item>
    </>
  );
}

export default FormSingleselect;
