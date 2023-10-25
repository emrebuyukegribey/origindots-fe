import { useEffect, useState } from "react";
import ProperToolBox from "../../components/ProperToolBox/ProperToolBox";
import { useContext, MainContext } from "../../context";
import "./CreateProcess.css";
import ProcessForm from "../../components/Process/ProcessForm";
import ProperForm, { ProperFormItem } from "../../components/Proper/ProperForm";
import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useRef } from "react";
import ProperItem from "../../components/ProperToolBox/ProperItem";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function CreateProcess() {
  const [processName, setProcessName] = useState("");
  const [procesType, setProcessType] = useState();
  const [processIcon, setProcessIcon] = useState();

  const [activeSidebarProper, setActiveSidebarProper] = useState();
  const [activeProper, setActiveProper] = useState();
  const [properList, setProperList] = useState([]);

  const spacerInsertedRef = useRef();
  const currentDragFieldRef = useRef();

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

  function getData(prop) {
    return prop?.data?.current ?? {};
  }

  function createSpacer({ id }) {
    return {
      id,
      type: "spacer",
      title: "spacer",
    };
  }

  const handleDragStart = (e) => {
    const { active } = e;
    const activeData = getData(active);
    if (activeData.fromSidebar) {
      const { proper } = activeData;
      const { type } = proper;
      setActiveSidebarProper(proper);
      // Create a new field that'll be added to the fields array
      // if we drag it over the canvas.
      currentDragFieldRef.current = {
        id: active.id,
        type,
        name: `${type}-${properList.length + 1}`,
      };
      return;
    }

    const { proper, index } = activeData;

    setActiveProper(proper);
    currentDragFieldRef.current = proper;
    properList((oldPropers) => [
      ...oldPropers,
      index,
      1,
      createSpacer({ id: active.id }),
    ]);
  };

  const handleDragOver = (e) => {
    console.log("handleDragOver");
    const { active, over } = e;
    const activeData = getData(active);

    console.log("activeData : ", activeData);
    if (activeData.fromSidebar) {
      const overData = getData(over);

      if (!spacerInsertedRef.current) {
        const spacer = createSpacer({
          id: active.id + "-spacer",
        });

        if (!properList.length) {
          properList.push(spacer);
        } else {
          const nextIndex =
            overData.index > -1 ? overData.index : properList.length;

          let tempList = properList;
          tempList.splice(nextIndex, 0, spacer);
          setProperList(tempList);
        }

        spacerInsertedRef.current = true;
      } else if (!over) {
      }
    }
  };

  const handleDragEnd = (e) => {
    /*
    setProperList((oldPropers) => [
      ...oldPropers,
      {
        id: 2,

        text: "Text Input",
        type: "InputField",
        title: "Proper name",
        placeholder: "Placeholder",
        description: "description (optional)",
      },
    ]);
    */
  };

  return (
    <>
      <Navbar />
      <LeftBar />
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        autoScroll
      >
        <div style={{ display: "flex", width: "100%" }}>
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
                      <div
                        className={step >= 1 ? "cp-step-ok" : "cp-step-grey"}
                      >
                        1
                      </div>
                      <div
                        className={
                          step >= 1 ? "cp-step-text-ok" : "cp-step-text"
                        }
                      >
                        Create Process
                      </div>
                    </div>

                    <div
                      className="cp-step-container"
                      onClick={() => (step >= 2 ? setStep(2) : {})}
                    >
                      <div
                        className={step >= 2 ? "cp-step-ok" : "cp-step-grey"}
                      >
                        2
                      </div>
                      <div
                        className={
                          step >= 2 ? "cp-step-text-ok" : "cp-step-text"
                        }
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
                        className={
                          step > 2 ? "cp-step-text-ok" : "cp-step-text"
                        }
                      >
                        Publish
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cp-process-form-container">
                  {step === 1 && <ProcessForm onClick={onCreateProcess} />}
                  {step === 2 && (
                    <div style={{ width: "100%" }}>
                      <SortableContext
                        strategy={verticalListSortingStrategy}
                        items={properList.map((proper) => proper.id)}
                      >
                        <ProperForm properList={properList} />
                      </SortableContext>

                      <DragOverlay dropAnimation={false}>
                        {activeSidebarProper ? (
                          <ProperItem overlay proper={activeSidebarProper} />
                        ) : null}
                        {activeProper ? (
                          <ProperFormItem overlay proper={activeProper} />
                        ) : null}
                      </DragOverlay>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DndContext>
    </>
  );
}

export default CreateProcess;
