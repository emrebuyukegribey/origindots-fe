import { Form } from "antd";
import "./FormItem.css";
import { AiOutlineEye } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";
import { useState } from "react";

function FormPropergroup({
  formValues,
  proper,
  properList,
  onChangeForParent,
}) {
  const [childPropers, setChildPropers] = useState(
    properList.filter((p) => p.parentId === proper.id)
  );
  console.log("formValues : ", formValues);
  console.log("childPropers : ", childPropers);

  const isComplatedRelatedProps = () => {
    formValues.foreach((fv) => {
      childPropers.foreach((cp) => {
        if (Object.keys(cp) === fv) {
          return true;
        }
      });
    });
    return false;
  };

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
