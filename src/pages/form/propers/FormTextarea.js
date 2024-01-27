import { Form, Input } from "antd";
import "./FormItem.css";
import TextArea from "antd/es/input/TextArea";
import { getCurrentDate } from "../PFormUtil";

function FormTextarea({ proper, addValueOnFormValues }) {
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
          { required: proper.required, message: proper.title + " is required" },
        ]}
      >
        <TextArea
          row={4}
          maxLength={250}
          placeholder={proper.placeholder}
          size="large"
          onChange={onChange}
        />
      </Form.Item>
    </>
  );
}

export default FormTextarea;
