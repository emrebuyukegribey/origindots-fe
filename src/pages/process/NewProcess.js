import React from "react";
import { useEffect, useState } from "react";
import ProperToolBox from "../../components/ProperToolBox/ProperToolBox";
import { useContext, MainContext } from "../../context";
import "./NewProcess.css";
import ProcessForm from "../../components/Process/ProcessForm";
import ProperForm from "../../components/Proper/ProperForm";
import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";
import { Steps, theme, message, Modal } from "antd";
import Property from "../../components/Property/Property";
import { CiCircleAlert } from "react-icons/ci";

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
  const [openProperty, setOpenProperty] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    setNavbarHeaderText,
    setActiveLeftBar,
    activeLeftBar,
    properList,
    setProperList,
    properValueList,
    setProperValueList,
    selectedProper,
    setSelectedProper,
  } = useContext(MainContext);

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

  const addProperOnForm = (proper) => {
    let shallow = Object.assign({}, proper);
    const uniqueId = `${proper.type}-${Math.floor(Math.random() * 1000)}`;
    shallow.id = uniqueId;
    shallow.isDrag = false;
    shallow.isRequired = false;
    addProperValue(shallow);
    messageApi.open({
      type: "success",
      content: `Added new proper : ${proper.text}`,
    });
    setProperList((oldPropers) => [...oldPropers, shallow]);
  };

  const addProperValue = (proper) => {
    if (
      proper.type === "MultiSelectField" ||
      proper.type === "SingleSelectField" ||
      proper.type === "DropDownField"
    ) {
      const properValue1UniqueId = `${proper.type}-${Math.floor(
        Math.random() * 1000
      )}-value-${Math.floor(Math.random() * 1000)}`;

      const properValue2UniqueId = `${proper.type}-${Math.floor(
        Math.random() * 1000
      )}-value-${Math.floor(Math.random() * 1000)}`;

      const properValue3UniqueId = `${proper.type}-${Math.floor(
        Math.random() * 1000
      )}-value-${Math.floor(Math.random() * 1000)}`;
      const properValue1 = {
        id: properValue1UniqueId,
        name: "Value1",
        properId: proper.id,
      };

      const properValue2 = {
        id: properValue2UniqueId,
        name: "Value2",
        properId: proper.id,
      };

      const properValue3 = {
        id: properValue3UniqueId,
        name: "Value3",
        properId: proper.id,
      };

      setProperValueList((oldProperValues) => [
        ...oldProperValues,
        properValue1,
        properValue2,
        properValue3,
      ]);
    }
  };

  const deleteProperWarning = (proper) => {
    Modal.confirm({
      title: "Are you sure you want to delete the proper ?",
      content: "The selected proper will be deleted !",
      icon: <CiCircleAlert size={20} color="red" />,
      onOk() {
        deleteProperOnForm(proper);
      },
      onCancel() {},
      okType: "danger",
    });
  };

  const deleteProperOnForm = (proper) => {
    setProperList(properList.filter((p) => p.id !== proper.id));
    messageApi.open({
      type: "error",
      content: `Deleted proper on the form : ${proper.text}`,
    });
  };

  const deleteProperValue = (properValue) => {
    setProperValueList(properValueList.filter((v) => v.id !== properValue.id));
    setOpenProperty(false);
    setTimeout(() => {
      openPropertyDrawer(selectedProper);
    }, 100);

    messageApi.open({
      type: "error",
      content: `Deleted proper value on the proper : ${properValue.name}`,
    });
  };

  const openPropertyDrawer = (proper) => {
    setSelectedProper(proper);
    setOpenProperty(true);
  };

  const editProperOnForm = (proper) => {
    const updatingProperList = properList.indexOf(proper);
    const updatedList = [...properList];
    updatedList[updatingProperList] = proper;
    setProperList(updatedList);

    messageApi.open({
      type: "success",
      content: `Updated proper on the form : ${proper.text}`,
    });
  };

  const closeProperty = () => {
    setSelectedProper(null);
    setOpenProperty(false);
  };

  return (
    <>
      <Navbar />
      <LeftBar />
      {contextHolder}
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
              <ProperToolBox addProper={addProperOnForm} />
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
              {currentStep === 0 && <ProcessForm onClick={onCreateProcess} />}
              {currentStep === 1 && (
                <ProperForm
                  previosStep={prev}
                  editProper={openPropertyDrawer}
                  deleteProper={deleteProperWarning}
                />
              )}
            </div>
            <div>
              <Property
                open={openProperty}
                openPropertyDrawer={openPropertyDrawer}
                onClose={closeProperty}
                editProper={editProperOnForm}
                deleteProperValue={deleteProperValue}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProcess;
