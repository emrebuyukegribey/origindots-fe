import { Form, InputNumber } from "antd";
import "./FormItem.css";
import { getCurrentDate } from "../PFormUtil";

function FormNumber({ proper, addValueOnFormValues }) {
  const onChange = (e) => {
    const value = e;
    const properObject = {
      properId: proper.id,
      properParenId: proper.parentId,
      properName: proper.title,
      properValue: value,
      properType: proper.type,
      createdDate: getCurrentDate(),
    };

    addValueOnFormValues(properObject);
  };
  return (
    <>
      <Form.Item
        className="form-input-container"
        label={proper.title}
        extra={proper.description}
        name={proper.id}
        rules={[
          { type: "number", message: "emre" },
          {
            required: proper.required,

            message: proper.title + " is required",
          },
        ]}
      >
        <InputNumber
          placeholder={proper.placeholder}
          onChange={onChange}
          style={{ width: "auto" }}
        />
      </Form.Item>
    </>
  );
}

export default FormNumber;
