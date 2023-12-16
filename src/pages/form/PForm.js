import { useEffect, useState } from "react";
import "./PForm.css";
import { useParams } from "react-router-dom";

import { Button } from "antd";
import { getProcessWithAllAtributes } from "../../services/http";
import ProcessIcons from "../../components/Process/ProcessIcons";

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

  return (
    <div className="pf-container">
      <div className="pf-process-container">
        <div className="pf-process-icon">{processIcon}</div>
        <div className="pf-process-name">{process.name}</div>
      </div>
      <div className="pf-divider" />
      <div>
        {properList.map((p) => (
          <div>{p.title}</div>
        ))}
      </div>
      <div>{properValueList.map((v) => v.name)}</div>
      <div className="pf-divider" />
      <div>
        <Button type="primary" danger size="large">
          KAYDET
        </Button>
      </div>
    </div>
  );
}

export default PForm;
