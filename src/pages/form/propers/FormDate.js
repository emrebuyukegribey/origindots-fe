import { DatePicker, Form, Input } from "antd";
import "./FormItem.css";

function FormDate({ proper }) {
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
        <DatePicker placeholder={proper.placeholder} />
      </Form.Item>
    </>
  );
}

export default FormDate;
