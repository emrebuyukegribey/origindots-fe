import { Form, Input } from "antd";
import "./FormItem.css";
import TextArea from "antd/es/input/TextArea";

function FormTextarea({ proper }) {
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
        <TextArea
          row={4}
          maxLength={6}
          placeholder={proper.placeholder}
          disabled
          size="large"
        />
      </Form.Item>
    </>
  );
}

export default FormTextarea;
