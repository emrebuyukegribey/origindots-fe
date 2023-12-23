import { Form, Input } from "antd";
import "./FormItem.css";

function FormInput({ proper }) {
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
        <Input placeholder={proper.placeholder} />
      </Form.Item>
    </>
  );
}

export default FormInput;