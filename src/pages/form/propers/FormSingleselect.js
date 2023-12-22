import { Form, Radio, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { RiErrorWarningFill } from "react-icons/ri";

function FormSingleselect({
  formValues,
  proper,
  properList,
  allProperList,
  properValueList,
  onChangeForParent,
}) {
  const [value, setValue] = useState(
    properValueList.filter((pv) => pv.childCount === 0)[0].name
  );
  const [childValuesWithChilds, setValuesWithChilds] = useState([]);
  const [childPropersForValues, setChildPropersForValues] = useState([]);
  const [touchedRelated, setTouchedRelated] = useState([]);

  useEffect(() => {
    console.log("use effect");
    const childs = [];

    formValues.forEach((fv) => {
      const key = Object.keys(fv)[0];
      const value = Object.values(fv)[0];

      allProperList.forEach((p) => {
        if (p.parentId === key && value && value.length > 0) {
          console.log("p : ", p);
          childs.push(p.parentId);
        }
      });
    });
  }, []);

  const isTouchedRelatedForm = () => {
    const related = [];
    for (let i = 0; i < childPropersForValues.length; i++) {
      formValues.forEach((element) => {
        if (
          Object.keys(element)[0] === childPropersForValues[i].id &&
          Object.values(element)[0] &&
          Object.values(element)[0].length > 0
        ) {
          related.push(childPropersForValues[0]);
        }
      });
    }
    setTouchedRelated(related);
  };

  useEffect(() => {
    setTimeout(() => {
      isTouchedRelatedForm();
    }, 200);
  }, touchedRelated);

  const onChange = (val) => {
    setValue(val.target.value);
    const value = properValueList.filter((v) => v.name === val.target.value)[0];

    if (value.childCount > 0) {
      onChangeForParent(value);
    }
  };

  const openRelatedForm = (value) => {
    const val = properValueList.filter(
      (v) => v.name === value && v.properId === proper.id
    )[0];
    onChangeForParent(val);
  };

  console.log("touchedRelated : ", touchedRelated);

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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <AiOutlineEye
                          color="#EF4136"
                          size={16}
                          style={{ margin: "0px 10px" }}
                        />
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
