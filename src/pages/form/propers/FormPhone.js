import { Form, InputNumber } from "antd";
import PhoneInput from "antd-phone-input";
import "./FormItem.css";

function FormPhone({ proper }) {
  const validator = (_, { valid }) => {
    // if (valid(true)) return Promise.resolve(); // strict validation
    if (valid()) return Promise.resolve(); // non-strict validation
    return Promise.reject("Invalid phone number");
  };
  return (
    <>
      <Form.Item
        className="form-input-container"
        label={proper.title}
        extra={proper.description}
        name={proper.id}
        rules={[
          {
            required: proper.required,
            message: proper.title + " is required",
          },
        ]}
      >
        <PhoneInput enableSearch />
      </Form.Item>
    </>
  );
}

export default FormPhone;
