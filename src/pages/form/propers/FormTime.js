import { Form, TimePicker } from "antd";
import "./FormItem.css";
import { getCurrentDate } from "../PFormUtil";

function FormTime({ proper, addValueOnFormValues }) {
  const onChange = (time, timeString) => {
    console.log("timeString : ", timeString);
    const value = timeString;
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
        <TimePicker placeholder={proper.placeholder} onChange={onChange} />
      </Form.Item>
    </>
  );
}

export default FormTime;
