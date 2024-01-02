import { Checkbox, Col, Form, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import { getCurrentDate } from "../PFormUtil";

function FormMultiselect({
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

  const findKeyInFormValues = (childsOfProperValue) => {
    let foundKey;
    formValues.forEach((fv) => {
      childsOfProperValue.forEach((c) => {
        if (
          Object.keys(fv)[0] === c.childId &&
          Object.values(fv)[0] &&
          Object.values(fv)[0].length > 0
        ) {
          foundKey = c.childId;
          return;
        }
      });
    });
    return foundKey;
  };

  const findValuesHavingChilds = (values) => {
    const valueWithChilds = [];
    values.forEach((v) => {
      const valueWithChild = properValueList.find(
        (pv) => pv.name === v && pv.properId === proper.id && pv.childCount > 0
      );
      if (valueWithChild) {
        valueWithChilds.push(valueWithChild);
      }
    });
    return valueWithChilds;
  };

  const findChildsSelectedValues = (valueWithChilds) => {
    const childs = [];
    valueWithChilds.forEach((value) => {
      allProperList
        .filter((p) => p.parentId === value.id)
        .map((cv) => {
          const object = { parentId: value.id, childId: cv.id };
          //localStorage.setItem(proper.id + cv.id + "selectedValue", cv.id);
          childs.push(object);
        });
    });
    console.log("childs : ", childs);
    return childs;
  };

  const findTouchedValue = (childs) => {
    if (childs && childs.length > 0) {
      const key = findKeyInFormValues(childs);
      // const value = findValueInFormValues(childs);
      childs.forEach((p) => {
        if (p.childId === key) {
          localStorage.setItem(p.parentId, key);
          setTouchedRelatedForm(p.parentId);
        } else {
          // localStorage.removeItem(p.parentId);
          // setTouchedRelatedForm(null);
        }
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      let selectedValues;
      if (
        localStorage.getItem(proper.id + "selectedValues") &&
        localStorage.getItem(proper.id + "selectedValues").includes(",")
      ) {
        selectedValues = localStorage
          .getItem(proper.id + "selectedValues")
          .split(",");
      }

      if (selectedValues && selectedValues.length > 0) {
        const valueWithChilds = findValuesHavingChilds(selectedValues);
        if (valueWithChilds && valueWithChilds.length > 0) {
          const childs = findChildsSelectedValues(valueWithChilds);
          findTouchedValue(childs);
        } else {
          setTouchedRelatedForm(null);
          localStorage.removeItem(proper.id);
        }
      } else {
        setTouchedRelatedForm(null);
        localStorage.removeItem(proper.id);
      }
    }, 200);
  });

  const onChange = (val) => {
    const properValues = getSelectedProperValues(val);
    localStorage.removeItem(proper.id);
    setTouchedRelatedForm(null);
    if (val) {
      localStorage.setItem(proper.id + "selectedValues", val);
    }

    setValue(val);
    const valueWithChilds = findValuesHavingChilds(val);
    if (valueWithChilds && valueWithChilds.length > 0) {
      const childs = findChildsSelectedValues(valueWithChilds);
      findTouchedValue(childs);
    }
    const properObject = {
      properId: proper.id,
      properParenId: proper.parentId,
      properName: proper.title,
      properValue: val,
      properValueId: properValues,
      properType: proper.type,
      createdDate: getCurrentDate(),
    };
    addValueOnFormValues(properObject);
  };

  const getSelectedProperValues = (val) => {
    const selectedValues = [];
    val.forEach((properValue) => {
      const value = properValueList.filter(
        (v) => v.name === properValue && v.properId === proper.id
      )[0];
      if (value) {
        selectedValues.push(value.id);
      }
    });
    return selectedValues;
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
