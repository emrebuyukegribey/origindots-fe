import { useEffect, useState } from "react";
import "./PForm.css";
import { useParams } from "react-router-dom";

import { Button, Form } from "antd";
import { getProcessWithAllAtributes } from "../../services/http";
import ProcessIcons from "../../components/Process/ProcessIcons";
import { FormRender } from "./FormRender";
import BackButtonBorder from "../../components/UI/Buttons/BackButtonBorder";
import ReturnButtonBorder from "../../components/UI/Buttons/ReturnButtonBorder";

function PForm() {
  const { id } = useParams();

  const [process, setProcess] = useState([]);
  const [processIcon, setProcessIcon] = useState();
  const [properList, setProperList] = useState([]);
  const [properValueList, setProperValueList] = useState([]);
  const [tempProperList, setTempProperList] = useState([]);
  const [tempProperValueList, setTempProperValueList] = useState([]);

  const [selected, setSelected] = useState();

  const getProcess = async () => {
    try {
      const response = await getProcessWithAllAtributes(id);
      if (response.status === 200) {
        setProcess(response.data?.process);
        setProperList(response.data?.properList);
        setTempProperList(response.data?.properList);
        setProperValueList(response.data?.properValueList);
        setTempProperValueList(response.data?.properValueList);
        const icon = ProcessIcons.filter(
          (i) => i.id.toString() === response.data.process.icon
        )[0].icon;
        setProcessIcon(icon);
      }
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    setProperList(tempProperList);
    getProcess();
  }, []);

  const onFinish = (values) => {
    if (selected) {
      goBack();
    }
    console.log("values : ", values);
  };

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
      <div className="pf-process-container">
        <div className="pf-process-icon">{processIcon}</div>
        <div className="pf-process-name">{process.name}</div>
      </div>
      <div className="pf-divider" />
      <Form layout="vertical" onFinish={onFinish}>
        <div className="pf-body-container">
          {properListForm.map((p) => (
            <FormRender
              proper={p}
              properList={properList.filter((v) => v.parentId === p.id)}
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
        </div>
      </Form>
    </div>
  );
}

export default PForm;
