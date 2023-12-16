import { Form, Input } from "antd";
import "./FormItem.css";

function FormEmail({ proper }) {
  return (
    <>
      <Form.Item
        className="form-input-container"
        label={proper.title}
        extra={proper.description}
        name={proper.id}
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: proper.required,
            message: proper.title + " is required",
          },
        ]}
      >
        <Input placeholder={proper.placeholder} />
      </Form.Item>
    </>
  );
}

export default FormEmail;
