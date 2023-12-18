import { Form } from "antd";
import "./FormItem.css";
import { AiOutlineEye } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";

function FormPropergroup({ proper, properList, onChangeForParent }) {
  const onClick = () => {
    onChangeForParent(proper);
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
        <div className="form-properGroup-container">
          <div onClick={onClick} className="form-properGroup-inner-container">
            <CiWarning className="form-properGroup-icon" />
            <div className="form-properGroup-text">
              {proper.title} alanı ile ile bilgiler bulunmaktadır. Görmek için
              lütfen tıklayınız.
            </div>
          </div>
        </div>
      </Form.Item>
    </>
  );
}

export default FormPropergroup;
