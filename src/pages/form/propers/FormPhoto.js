import { Form, Input, Upload } from "antd";
import { HiOutlinePhoto } from "react-icons/hi2";
import "./FormItem.css";

function FormPhoto({ proper }) {
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
        <Upload size="large">
          <div className="form-photo-container ">
            <HiOutlinePhoto className="photo-field-upload-icon" />
            <div>{proper.placeholder}</div>
          </div>
        </Upload>
      </Form.Item>
    </>
  );
}

export default FormPhoto;
