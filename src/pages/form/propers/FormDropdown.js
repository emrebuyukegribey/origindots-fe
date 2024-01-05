import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import { getCurrentDate } from "../PFormUtil";

function FormDropdown({
  addValueOnFormValues,
  formValues,
  proper,
  allProperList,
  properValueList,
  onChangeForParent,
}) {
  const [touchedRelatedForm, setTouchedRelatedForm] = useState(
    localStorage.getItem(proper.id)
  );

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
              <AiOutlineEye style={{ marginRight: "10px" }} />
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

  const onChange = (val) => {
    setTouchedRelatedForm(null);
    localStorage.removeItem(proper.id);
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
      properValue: val,
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
      (v) => v.name === val && v.properId === proper.id
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
          if (
            Object.keys(fv)[0] === c.id &&
            Object.values(fv)[0] &&
            Object.values(fv)[0].length > 0
          ) {
            foundKey = c.id;
            return;
          }
        });
      });
    }

    return foundKey;
  };

  const findTouchedValue = (selectedValue, childsOfProperValue) => {
    let isFoundedRelatedElement = false;
    if (childsOfProperValue && childsOfProperValue.length > 0) {
      const key = findKeyInFormValues(childsOfProperValue);
      childsOfProperValue.forEach((p) => {
        if (p.id === key) {
          localStorage.setItem(proper.id, selectedValue.id);
          setTouchedRelatedForm(selectedValue.id);
          isFoundedRelatedElement = true;
          return;
        }
      });
    }
    if (!isFoundedRelatedElement) {
      localStorage.removeItem(proper.id);
      // setTouchedRelatedForm(null);
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
        // setTouchedRelatedForm(null);
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
        rules={[
          { required: proper.required, message: proper.title + " is required" },
        ]}
      >
        <Select
          options={properValues}
          placeholder={proper.placeholder}
          onChange={onChange}
        ></Select>
      </Form.Item>
    </>
  );
}

export default FormDropdown;
