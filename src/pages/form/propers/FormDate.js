import { DatePicker, Form, Input } from "antd";
import "./FormItem.css";
import moment from "moment";
import { getCurrentDate } from "../PFormUtil";

function FormDate({ proper, addValueOnFormValues }) {
  const onChange = (date, dateString) => {
    const properObject = {
      properId: proper.id,
      properParenId: proper.parentId,
      properName: proper.title,
      properValue: dateString,
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
        <DatePicker placeholder={proper.placeholder} onChange={onChange} />
      </Form.Item>
    </>
  );
}

export default FormDate;
