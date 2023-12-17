import { Form, Select } from "antd";
import { AiOutlineEye } from "react-icons/ai";

function FormDropdown({ proper, properValueList }) {
  console.log("properValueList : ", properValueList);
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
        value: name,
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
        rules={[
          { required: proper.required, message: proper.title + " is required" },
        ]}
      >
        <Select
          options={properValues}
          placeholder={proper.placeholder}
        ></Select>
      </Form.Item>
    </>
  );
}

export default FormDropdown;
