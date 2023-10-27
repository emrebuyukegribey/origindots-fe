import React from "react";
import { useEffect, useState } from "react";
import ProperToolBox from "../../components/ProperToolBox/ProperToolBox";
import { useContext, MainContext } from "../../context";
import "./NewProcess.css";
import ProcessForm from "../../components/Process/ProcessForm";
import ProperForm from "../../components/Proper/ProperForm";
import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";
import { Button, Steps, theme, message } from "antd";

const steps = [
  {
    title: "Create Process",
    content: "Create-Process",
  },
  {
    title: "Create Propers",
    content: "Create-Propers",
  },
  {
    title: "Public",
    content: "Publish",
  },
];

function NewProcess() {
  const [processName, setProcessName] = useState("");
  const [procesType, setProcessType] = useState();
  const [processIcon, setProcessIcon] = useState();
  const [currentStep, setCurrentStep] = useState(0);

  const { setNavbarHeaderText, setActiveLeftBar, activeLeftBar } =
    useContext(MainContext);

  const { token } = theme.useToken();

  useEffect(() => {
    setActiveLeftBar(false);
  }, activeLeftBar);

  setNavbarHeaderText("Process Management > New Process");

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const onCreateProcess = (process) => {
    setProcessName(process.name);
    setProcessType(process.type);
    setProcessIcon(process.icon);
    next();
  };

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Navbar />
      <LeftBar />
      <div
        className="right-container"
        style={{
          width: activeLeftBar ? "calc(100% - 275px)" : "calc(100% - 70px)",
          marginLeft: activeLeftBar ? "275px" : "70px",
        }}
      >
        <div className="cp-container">
          {currentStep === 1 && (
            <div className="cp-proper-tool-box-container">
              <ProperToolBox />
            </div>
          )}
          <div className="cp-body-container">
            <div className="cp-body-top-container">
              <Steps
                current={currentStep}
                items={items}
                navArrowColor="yellow"
              />
            </div>
            <div className="cp-process-form-container">
              {console.log("currentStep : ", currentStep)}
              {currentStep === 0 && <ProcessForm onClick={onCreateProcess} />}
              {currentStep === 1 && <ProperForm previosStep={prev} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProcess;
