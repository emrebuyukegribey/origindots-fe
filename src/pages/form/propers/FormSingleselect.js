import { Form, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";

function FormSingleselect({
  formValues,
  proper,
  allProperList,
  properValueList,
  onChangeForParent,
}) {
  const [value, setValue] = useState(
    properValueList.filter((pv) => pv.childCount === 0)[0].name
  );

  const [touchedRelated, setTouchedRelated] = useState([]);

  useEffect(() => {
    // isTouchedRelated();
  }, []);

  /*
  const isTouchedRelated = () => {
    const childs = [];
    const childsOfValues = findChildsProperValues();

    if (childsOfValues && childsOfValues.length > 0) {
      formValues.forEach((fv) => {
        const key = Object.keys(fv)[0];
        const value = Object.values(fv)[0];
        childsOfValues.forEach((p) => {
          if (p.id === key && value && value.length > 0) {
            childs.push(p.parentId);
          }
        });
      });
    }
    setTouchedRelated(childs);
  };
  */

  const findChildsProperValues = () => {
    const childs = [];
    allProperList.forEach((proper) => {
      properValueList.forEach((value) => {
        if (proper.parentId === value.id) {
          childs.push(proper);
        }
      });
    });

    return childs;
  };

  const onChange = (val) => {
    localStorage.removeItem("singSelectSelectedValue");
    setValue(val.target.value);
    const properValue = properValueList.filter(
      (v) => v.name === val.target.value
    )[0];

    if (properValue.childCount > 0) {
      const childs = [];
      const childsOfValues = findChildsProperValues();

      console.log("properValue : ", properValue);
      const childOfProperValue = allProperList.filter(
        (p) => p.parentId === properValue.id
      );

      console.log("childOfProperValue  : ", childOfProperValue);

      if (childsOfValues && childsOfValues.length > 0) {
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
      setTouchedRelated(childs);
      console.log("properValue : ", properValue);
      onChangeForParent(properValue);
      localStorage.setItem("singSelectSelectedValue", value.id);
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
                        {touchedRelated.includes(prop.id) &&
                          localStorage.getItem("singSelectSelectedValue") ===
                            prop.id && (
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
