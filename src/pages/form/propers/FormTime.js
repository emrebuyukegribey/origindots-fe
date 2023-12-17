import { Form, TimePicker } from "antd";
import "./FormItem.css";

function FormTime({ proper }) {
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
        <TimePicker placeholder={proper.placeholder} />
      </Form.Item>
    </>
  );
}

export default FormTime;
