import { Form } from "antd";
import "./FormItem.css";
import { CiWarning } from "react-icons/ci";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

function FormPropergroup({
  formValues,
  proper,
  properList,
  onChangeForParent,
}) {
  const [childPropers, setChildPropers] = useState([]);
  const [touchedRelated, setTouchedRelated] = useState(false);

  const onClick = () => {
    onChangeForParent(proper);
  };

  useEffect(() => {
    const childs = [];
    properList.filter((p) => {
      childs.push(p);
    });

    setChildPropers(childs);
  }, [touchedRelated]);

  const isTouchedRelatedForm = () => {
    console.log("formValues : ", formValues);
    for (let i = 0; i < childPropers.length; i++) {
      formValues.forEach((element) => {
        if (
          Object.keys(element)[0] === childPropers[i].id &&
          Object.values(element)[0] &&
          Object.values(element)[0].length > 0
        ) {
          setTouchedRelated(true);
        }
      });
    }
  };

  useEffect(() => {
    isTouchedRelatedForm();
  }, [isTouchedRelatedForm]);

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
            {touchedRelated ? (
              <div style={{ display: "flex" }}>
                <IoMdCheckmark
                  className="form-properGroup-icon"
                  color="#18bd5b"
                />
                <div className="form-properGroup-text">
                  {proper.title} alanı ile ilgili bilgiler kaydedildi. Tekrar
                  düzenlemek için tıklayınız.
                </div>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <CiWarning className="form-properGroup-icon" />
                <div className="form-properGroup-text">
                  {proper.title} alanı ile ile bilgiler bulunmaktadır. Görmek
                  için lütfen tıklayınız.
                </div>
              </div>
            )}
          </div>
        </div>
      </Form.Item>
    </>
  );
}

export default FormPropergroup;
