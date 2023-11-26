import { Input, Modal, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import "./ProcessForm.css";
import ProcessIcons from "./ProcessIcons";
import DarkButton from "../UI/Buttons/DarkButton";
import { CiCircleAlert } from "react-icons/ci";
import { withTranslation } from "react-i18next";
import DarkButtonBorder from "../UI/Buttons/DarkButtonBorder";

const icons = ProcessIcons;

function ProcessForm(props) {
  let processName = localStorage.getItem("processName");
  let processType = localStorage.getItem("processType");
  let processIcon = localStorage.getItem("processIcon") || icons[0].id;

  const onChangeName = (e) => {
    e.preventDefault();
    const value = e.target.value;
    processName = value;
  };

  const onChangeType = (e) => {
    const value = e.target.value;
    processType = value;
  };

  const onChangeIcon = (e) => {
    const selectedIcon = icons.filter((icon) => icon.id === e);
    processIcon = selectedIcon[0].id;
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
            defaultValue={processType ? processType : "STATIC_LOCATION"}
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
            {icons.find((icon) => Number(icon.id) === Number(processIcon)).icon}
          </div>
          <Select
            size="large"
            className="process-form-input"
            onChange={onChangeIcon}
            defaultValue={
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
        <div style={{ width: "20%" }}>
          <DarkButtonBorder
            text={props.t("Create Process")}
            onClick={handleProcess}
          />
        </div>
      </div>
    </div>
  );
}

const ProcessFormtWithTranslation = withTranslation()(ProcessForm);
export default ProcessFormtWithTranslation;
