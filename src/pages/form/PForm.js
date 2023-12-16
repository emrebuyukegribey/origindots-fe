import { useEffect, useState } from "react";
import "./PForm.css";
import { useParams } from "react-router-dom";

import { Button, Form } from "antd";
import { getProcessWithAllAtributes } from "../../services/http";
import ProcessIcons from "../../components/Process/ProcessIcons";
import { FormRender } from "./FormRender";

function PForm() {
  const { id } = useParams();

  const [process, setProcess] = useState([]);
  const [processIcon, setProcessIcon] = useState();
  const [properList, setProperList] = useState([]);
  const [properValueList, setProperValueList] = useState([]);

  const getProcess = async () => {
    try {
      const response = await getProcessWithAllAtributes(id);
      if (response.status === 200) {
        setProcess(response.data?.process);
        setProperList(response.data?.properList);
        setProperValueList(response.data?.properValueList);
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
    getProcess();
  }, []);

  const onFinish = (values) => {
    console.log("values : ", values);
  };

  return (
    <div className="pf-container">
      <div className="pf-process-container">
        <div className="pf-process-icon">{processIcon}</div>
        <div className="pf-process-name">{process.name}</div>
      </div>
      <div className="pf-divider" />
      <Form layout="vertical" onFinish={onFinish}>
        <div className="pf-body-container">
          <div>
            {properList.map((p) => (
              <FormRender proper={p} key={p.id} />
            ))}
          </div>
        </div>
        <div className="pf-divider" />
        <div className="pf-button-container">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="pf-submit-button"
          >
            KAYDET
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default PForm;
