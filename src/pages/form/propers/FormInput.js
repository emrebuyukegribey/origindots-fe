import { Form, Input } from "antd";
import "./FormInput.css";

function FormInput({ proper }) {
  console.log("proper : ", proper);
  return (
    <>
      <Form.Item
        className="form-input-container"
        label={proper.title}
        name={proper.id}
        rules={[
          { required: proper.required, message: `${proper.title} is required` },
        ]}
      >
        <Input placeholder={proper.placeholder} />
        <div style={{ fontSize: "13px", marginTop: "3px", marginLeft: "3px" }}>
          {proper.description}
        </div>
      </Form.Item>
    </>
  );
}

export default FormInput;
