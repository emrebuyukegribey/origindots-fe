import { Input, Radio, Select } from "antd";
import { useState } from "react";
import "./ProcessForm.css";
import ProcessIcons from "./ProcessIcons";
import BlueButton from "../UI/Buttons/BlueButton";

const icons = ProcessIcons;

function ProcessForm(props) {
  const [processName, setProcessName] = useState(
    localStorage.getItem("processName") || ""
  );
  const [processType, setProcessType] = useState(
    localStorage.getItem("processType") || ""
  );
  const [processIcon, setProcessIcon] = useState(
    localStorage.getItem("processIcon") || icons[0].id
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
      processName: props.processName,
      processType: props.processType,
      processIcon: props.processIcon,
    };
    saveFieldsInLocalStorage();
    props.onClick(process);
  };

  return (
    <div className="process-form-container">
      <h3>CREATE PROCESS</h3>
      <div className="process-form-divider" />
      <div className="process-form">
        <div className="process-form-element-container">
          <div className="process-form-label">Name of Process </div>
          <Input
            size="large"
            value={processName}
            className="process-form-input"
            onChange={onChangeName}
            placeholder="Please enter name of process"
          />
        </div>
        <div className="process-form-element-container">
          <div className="process-form-label">Type of Process </div>
          <Radio.Group
            value={processType}
            onChange={onChangeType}
            className="process-form-radio-group"
          >
            <Radio style={{ fontSize: "16px" }} value="STATIC_LOCATION" checked>
              Static Location
            </Radio>
            <Radio style={{ fontSize: "16px" }} value="DYNAMIC_LOCATION">
              Dynamic Location
            </Radio>
          </Radio.Group>
        </div>
        <div className="process-form-element-container">
          <div className="process-form-label">Name of Process </div>

          <div
            style={{
              marginLeft: "15px",
              marginRight: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icons.find((icon) => Number(icon.id) === Number(processIcon)).icon}
          </div>
          <Select
            size="large"
            className="process-form-input"
            onChange={onChangeIcon}
            value={
              icons.find((icon) => Number(icon.id) === Number(processIcon)).name
            }
            placeholder="Please select a process icon"
            options={icons.map((i) => ({
              label: (
                <div className="process-form-icon-container">
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
        <BlueButton text="Create Process" onClick={handleProcess} />
      </div>
    </div>
  );
}

export default ProcessForm;
