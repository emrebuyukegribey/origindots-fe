import { Input, Modal, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import "./ProcessForm.css";
import ProcessIcons from "./ProcessIcons";
import DarkButton from "../UI/Buttons/DarkButton";
import { CiCircleAlert } from "react-icons/ci";
import { withTranslation } from "react-i18next";
import DarkButtonBorder from "../UI/Buttons/DarkButtonBorder";
import { useNavigate } from 'react-router-dom';

const icons = ProcessIcons;

function ProcessForm(props) {

  const navigate = useNavigate();

  const [processName, setProcessName] = useState(
    localStorage.getItem("processName")
      ? localStorage.getItem("processName")
      : ""
  );
  const [processType, setProcessType] = useState(
    localStorage.getItem("processType")
      ? localStorage.getItem("processType")
      : "STATIC_LOCATION"
  );
  const [processIcon, setProcessIcon] = useState(
    localStorage.getItem("processIcon")
      ? localStorage.getItem("processIcon")
      : icons[0].id
  );

  const onChangeName = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setProcessName(value);
  };

  const onChangeType = (e) => {
    const value = e.target.value;
    setProcessType(value);
  };

  const onChangeIcon = (e) => {
    const selectedIcon = icons.filter((icon) => icon.id === e);
    setProcessIcon(selectedIcon[0].id);
  };

  const saveFieldsInLocalStorage = () => {
    localStorage.setItem("processName", processName);
    localStorage.setItem("processType", processType);
    localStorage.setItem("processIcon", processIcon);
  };

  const handleProcess = () => {
    const process = {
      processName,
      processType,
      processIcon,
    };

    saveFieldsInLocalStorage();

    if (!processName || !processType || !processIcon) {
      showCreatingProcessErrorModal();
      return;
    }

    props.onClick(process);
  };

  const back = ()=>{
    navigate(-1);
  }

  const showCreatingProcessErrorModal = () => {
    Modal.warning({
      title: "Process values can not be empty !",
      icon: <CiCircleAlert size={20} color="#1677ff" />,
      content: "Process's name, type and icon fields must be filled in",
    });
  };

  return (
    <div className="process-form-container">
      <h3>{props.t("CREATE PROCESS")}</h3>
      <div className="process-form-divider" />
      <div className="process-form">
        <div className="process-form-element-container">
          <div className="process-form-label">
            {props.t("Name of Process")}{" "}
          </div>
          <Input
            size="large"
            defaultValue={processName}
            className="process-form-input"
            onChange={onChangeName}
            placeholder="Please enter name of process"
          />
        </div>
        <div className="process-form-element-container">
          <div className="process-form-label">
            {props.t("Type of Process")}{" "}
          </div>
          <Radio.Group
            value={processType ? processType : "STATIC_LOCATION"}
            // defaultValue={processType ? processType : "STATIC_LOCATION"}
            onChange={onChangeType}
            className="process-form-radio-group"
          >
            <Radio style={{ fontSize: "16px" }} value="STATIC_LOCATION">
              {props.t("Static Location")}
            </Radio>
            <Radio style={{ fontSize: "16px" }} value="DYNAMIC_LOCATION">
              {props.t("Dynamic Location")}
            </Radio>
          </Radio.Group>
        </div>
        <div className="process-form-element-container">
          <div className="process-form-label">
            {props.t("Icon of Process")}{" "}
          </div>

          <div
            style={{
              marginLeft: "15px",
              marginRight: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "32px",
            }}
          >
            {processIcon
              ? icons.find((icon) => Number(icon.id) === Number(processIcon))
                  .icon
              : icons[0].icon}
          </div>

          <Select
            size="large"
            className="process-form-input"
            onChange={onChangeIcon}
            defaultValue={
              processIcon
                ? icons.find((icon) => Number(icon.id) === Number(processIcon))
                    .name
                : icons[0].name
            }
            placeholder="Please select a process icon"
            options={icons.map((i) => ({
              label: (
                <div className="process-form-icon-container" key={i.id}>
                  <div className="process-form-icon">{i.icon}</div>
                  <div className="process-form-icon-text">{i.name}</div>
                </div>
              ),
              value: i.id,
            }))}
          ></Select>
        </div>
      </div>
      <div className="process-form-divider" />
      <div className="process-form-button-container">
      <div style={{ width: "10%",marginRight:"7px" }}>
          <DarkButtonBorder
            text={props.t("Back")}
            onClick={back}
          />
        </div>
        <div style={{ width: "30%" }}>
          <DarkButtonBorder
            text={props.t("Go on")}
            onClick={handleProcess}
          />
        </div>
      </div>
    </div>
  );
}

const ProcessFormtWithTranslation = withTranslation()(ProcessForm);
export default ProcessFormtWithTranslation;
