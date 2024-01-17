import { useEffect, useState } from "react";
import "./Preview.css";
import { Form } from "antd";
import BackButtonBorder from "../UI/Buttons/BackButtonBorder";
import ReturnButtonBorder from "../UI/Buttons/ReturnButtonBorder";
import { FormRender } from "../../pages/form/FormRender";
import ProcessIcons from "../Process/ProcessIcons";

function Preview({ processName, processIcon, propers, properValues }) {
  const [properList, setProperList] = useState(propers);
  const [properValueList, setProperValueList] = useState(properValues);
  const [tempProperList, setTempProperList] = useState([]);
  const [tempProperValueList, setTempProperValueList] = useState([]);

  const [formValues, setFormValues] = useState([]);

  const [selected, setSelected] = useState();

  useEffect(() => {
    setProperList(propers);
    setProperValueList(properValues);
  }, [properList, properValueList]);

  const removeProperValuesInStorage = () => {
    for (let [key, value] of Object.entries(localStorage)) {
      if (key.includes("prp-") || key.toLocaleLowerCase().includes("value")) {
        localStorage.removeItem(key);
      }
    }
  };

  const addValueOnFormValues = (properObject) => {
    const formValuesTemp = [...formValues];
    const properIndex = formValuesTemp.findIndex((p) => {
      return p.properId === properObject.properId;
    });

    if (properIndex >= 0) {
      formValuesTemp[properIndex] = properObject;
    } else {
      formValuesTemp.push(properObject);
    }
    setFormValues(formValuesTemp);
  };

  /*
  const onFinish = (values) => {
    console.log("values : ", values);
    console.log("formValues : ", formValues);
    let newArr = [...formValues];
    if (values) {
      const objectKeys = Object.keys(values);
      objectKeys.map((key) => {
        const value = { [key]: values[key] };
        const valueIndex = newArr.findIndex((v) => Object.keys(v)[0] === key);
        if (valueIndex >= 0) {
          newArr[valueIndex] = value;
        } else {
          newArr.push(value);
        }
      });
      setFormValues(
        newArr.filter((v) => {
          return Object.values(v)[0] !== undefined;
        })
      );
    }
    if (selected) {
      goBack();
    } else {
      removeProperValuesInStorage();
    }
  };
  */

  const onChangeForParent = (val) => {
    setProperList(tempProperList);
    setSelected(val);
    // const childPropers = properList.filter((p) => p.parentId === val.id);
    // setProperList(childPropers);
  };

  const goBack = () => {
    let newSelected = null;
    setProperList(tempProperList);
    if (selected.parentId || selected.properId) {
      if (selected.id.includes("value")) {
        const tempNewSelected = properList.filter(
          (p) => p.id === selected.properId
        )[0];
        newSelected = properList.filter(
          (proper) => proper.id === tempNewSelected.parentId
        )[0];
        if (!newSelected) {
          newSelected = properValueList.filter(
            (v) => v.id === tempNewSelected.parentId
          )[0];
        }
      } else {
        let tempNewSelected = properList.filter(
          (p) => p.id === selected.parentId
        )[0];
        if (!tempNewSelected) {
          tempNewSelected = properList.filter(
            (p) => p.id === selected.properId
          )[0];
        }
        if (!tempNewSelected) {
          tempNewSelected = properValueList.filter(
            (v) => v.id === selected.parentId
          )[0];
        }
        newSelected = tempNewSelected;
        if (!newSelected) {
          newSelected = properValueList.filter(
            (v) => v.id === tempNewSelected.parentId
          )[0];
        }
      }
      setSelected(newSelected);
    } else {
      setSelected(null);
      setProperList(tempProperList);
      setProperValueList(tempProperValueList);
    }
  };

  const goReturn = () => {
    setSelected(null);
    setProperList(tempProperList);
    setProperValueList(tempProperValueList);
  };

  const properListForm = properList.filter((proper) =>
    selected ? proper.parentId === selected.id : proper.parentId === null
  );

  return (
    <div className="pf-container">
      <div>
        <div className="pf-process-container">
          <div className="pf-process-icon">
            {
              ProcessIcons.filter(
                (icon) => icon.id.toString() === processIcon
              )[0].icon
            }
          </div>
          <div className="pf-process-name">{processName}</div>
        </div>
        <div className="pf-divider" />
        <Form layout="vertical">
          <div className="pf-body-container">
            {properListForm.map((p) => (
              <FormRender
                addValueOnFormValues={addValueOnFormValues}
                formValues={formValues}
                proper={p}
                properList={properList.filter((v) => v.parentId === p.id)}
                allProperList={properList}
                properValueList={properValueList.filter(
                  (v) => v.properId === p.id
                )}
                key={p.id}
                onChangeForParent={onChangeForParent}
              />
            ))}
          </div>
          <div className="pf-divider" />
          <div
            className="pf-button-container"
            style={{ justifyContent: selected ? "" : "flex-end" }}
          >
            {selected && (
              <div className="pf-back-buttons">
                <BackButtonBorder onClick={goBack} />
                <ReturnButtonBorder onClick={goReturn} />
              </div>
            )}
            {/*
            <div className="pg-submit-button">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="pf-submit-button"
              >
                KAYDET
              </Button>
            </div>
            */}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Preview;
