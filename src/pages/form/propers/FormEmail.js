import { Form, Input } from "antd";
import "./FormItem.css";
import { getCurrentDate } from "../PFormUtil";

function FormEmail({ proper, addValueOnFormValues }) {
  const onChange = (e) => {
    const value = e.target.value;
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
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: proper.required,
            message: proper.title + " is required",
          },
        ]}
      >
        <Input placeholder={proper.placeholder} onChange={onChange} />
      </Form.Item>
    </>
  );
}

export default FormEmail;
