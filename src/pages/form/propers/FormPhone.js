import { Form, InputNumber } from "antd";
import "./FormItem.css";

function FormPhone({ proper }) {
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
        <InputNumber placeholder={proper.placeholder} />
      </Form.Item>
    </>
  );
}

export default FormPhone;
