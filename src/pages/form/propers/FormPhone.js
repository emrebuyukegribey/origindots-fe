import { Form, InputNumber } from "antd";
import PhoneInput from "antd-phone-input";
import "./FormItem.css";
import { getCurrentDate } from "../PFormUtil";

function FormPhone({ proper, addValueOnFormValues }) {
  const validator = (_, { valid }) => {
    // if (valid(true)) return Promise.resolve(); // strict validation
    if (valid()) return Promise.resolve(); // non-strict validation
    return Promise.reject("Invalid phone number");
  };

  const onChange = (e) => {
    const value = e.countryCode + e.areaCode + e.phoneNumber;
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
          {
            required: proper.required,
            message: proper.title + " is required",
          },
        ]}
      >
        <PhoneInput enableSearch onChange={onChange} />
      </Form.Item>
    </>
  );
}

export default FormPhone;
