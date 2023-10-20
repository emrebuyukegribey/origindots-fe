import { useEffect, useState } from "react";
import ProperToolBox from "../../components/ProperToolBox/ProperToolBox";
import { useContext, MainContext } from "../../context";
import "./CreateProcess.css";
import ProcessForm from "../../components/Process/ProcessForm";
import ProperForm from "../../components/Proper/ProperForm";
import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";

function CreateProcess() {
  const [processName, setProcessName] = useState("");
  const [procesType, setProcessType] = useState();
  const [processIcon, setProcessIcon] = useState();

  const { setNavbarHeaderText, setActiveLeftBar, activeLeftBar } =
    useContext(MainContext);

  useEffect(() => {
    setActiveLeftBar(false);
  }, activeLeftBar);

  setNavbarHeaderText("Process Management > New Process");

  const [step, setStep] = useState(1);

  const onCreateProcess = (process) => {
    setProcessName(process.name);
    setProcessType(process.type);
    setProcessIcon(process.icon);
    setStep(2);
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
          {step === 2 && (
            <div className="cp-proper-tool-box-container">
              <ProperToolBox />
            </div>
          )}
          <div
            className={
              step === 1
                ? "cp-body-container-process-form"
                : "cp-body-container"
            }
          >
            <div className="cp-body-top-container">
              <div className="cp-steps-container">
                <div
                  className="cp-step-container"
                  onClick={() => (step > 1 ? setStep(1) : {})}
                >
                  <div className={step >= 1 ? "cp-step-ok" : "cp-step-grey"}>
                    1
                  </div>
                  <div
                    className={step >= 1 ? "cp-step-text-ok" : "cp-step-text"}
                  >
                    Create Process
                  </div>
                </div>

                <div
                  className="cp-step-container"
                  onClick={() => (step >= 2 ? setStep(2) : {})}
                >
                  <div className={step >= 2 ? "cp-step-ok" : "cp-step-grey"}>
                    2
                  </div>
                  <div
                    className={step >= 2 ? "cp-step-text-ok" : "cp-step-text"}
                  >
                    Create Properties
                  </div>
                </div>

                <div
                  className="cp-step-container"
                  onClick={() => (step > 2 ? setStep(3) : {})}
                >
                  <div className={step > 2 ? "cp-step-ok" : "cp-step-grey"}>
                    3
                  </div>
                  <div
                    className={step > 2 ? "cp-step-text-ok" : "cp-step-text"}
                  >
                    Publish
                  </div>
                </div>
              </div>
            </div>
            <div className="cp-process-form-container">
              {step === 1 && <ProcessForm onClick={onCreateProcess} />}
              {step === 2 && <ProperForm />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProcess;
