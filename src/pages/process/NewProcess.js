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
  const [selectedValueForAddProper, setSelectedValueForAddProper] = useState();
  const [selectedValueList, setSelectedValueList] = useState([]);

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

  if (!selectedValueForAddProper) {
    setNavbarHeaderText("Process Management > New Process");
  }

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

  const uniqueProper = (proper) => {
    let shallow = Object.assign({}, proper);
    const uniqueId = `eb-${Date.now()}-${shallow.type}-${Math.floor(
      Math.random() * 1000
    )}`;
    shallow.id = uniqueId;
    shallow.isDrag = false;
    shallow.isRequired = false;
    shallow.listNo = properList.length;
    shallow.childCount = 0;
    shallow.parentId = selectedValueForAddProper
      ? selectedValueForAddProper.id
      : null;

    return shallow;
  };

  const showMessage = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const addProperOnForm = (proper) => {
    const shallow = uniqueProper(proper);
    addProperValue(shallow);
    showMessage("success", `Added new proper : ${proper.text}`);

    if (shallow.parentId) {
      const parentProperValue = properValueList.filter(
        (value) => value.id === selectedValueForAddProper.id
      )[0];
      parentProperValue.childCount++;
      /*
      const updatingProperValueIndex = properValueList.indexOf(parentProperValue);
      const updatedProperValueList = properValueList;
      updatedProperValueList[updatingProperValueIndex] = parentProperValue;
      */

      /*setProperValueList(updatedProperValueList);
      setProperValueList((oldProperValues) => [
        ...oldProperValues,
        updatedProperValueList,
      ])*/
    }
    setProperList((oldPropers) => [...oldPropers, shallow]);
  };

  const createProperValue = (proper, valueName) => {
    const properValueUniqueId = `eb-${Date.now()}-${proper.type}-${Math.floor(
      Math.random() * 1000
    )}-value-${valueName}-${Math.floor(Math.random() * 1000)}`;

    const properValue = {
      id: properValueUniqueId,
      name: valueName,
      properId: proper.id,
      listNo: selectedValueForAddProper
        ? properValueList.filter(
            (value) => value.properId === selectedValueForAddProper.id
          ).length
        : properValueList.length,
      childCount: 0,
    };

    return properValue;
  };

  const addProperValue = (proper) => {
    if (
      proper.type === "MultiSelectField" ||
      proper.type === "SingleSelectField" ||
      proper.type === "DropDownField"
    ) {
      const properValue1 = createProperValue(proper, "Value1");
      const properValue2 = createProperValue(proper, "Value2");
      const properValue3 = createProperValue(proper, "Value3");

      setProperValueList((oldProperValues) => [
        ...oldProperValues,
        properValue1,
        properValue2,
        properValue3,
      ]);
    }
  };

  const openFormForSelectedValue = (value) => {
    setOpenProperty(false);
    setNavbarHeaderText(
      `Process Management > New Process > Proper > Selected > ${value.name}`
    );
    setSelectedValueForAddProper(value);
  };

  const cancelAddProperInValue = () => {
    setSelectedValueList([]);
    setSelectedValueForAddProper(null);
    closeProperty();
  };

  const goBackPreviousForm = () => {
    const parentProper = properList.filter(
      (proper) => proper.id === selectedValueForAddProper.properId
    )[0];

    if (parentProper && parentProper.parentId) {
      const selectedProperValue = properValueList.filter(
        (value) => value.id === parentProper.parentId
      )[0];

      if (selectedProperValue) {
        setSelectedValueForAddProper({ selectedProperValue });
        openFormForSelectedValue(selectedProperValue);
      }
    } else {
      cancelAddProperInValue();
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
    // setProperList(properList.filter((p) => p.parentId !== proper.id));
    showMessage("error", `Deleted proper on the form : ${proper.text}`);
  };

  const deleteProperValue = (properValue) => {
    setProperValueList(properValueList.filter((v) => v.id !== properValue.id));
    setProperList(
      properList.filter((proper) => proper.parentId !== properValue.id)
    );
    setOpenProperty(false);
    setTimeout(() => {
      openPropertyDrawer(selectedProper);
    }, 100);

    showMessage(
      "error",
      `Deleted proper value on the proper : ${properValue.name}`
    );
  };

  const openPropertyDrawer = (proper) => {
    setSelectedProper(proper);
    setOpenProperty(true);
  };

  const editProperOnForm = (proper) => {
    setSelectedProper(proper);
    const updatingProperList = properList.indexOf(proper);
    const updatedList = [...properList];
    updatedList[updatingProperList] = proper;
    setProperList(updatedList);
    showMessage("success", `Updated proper on the form : ${proper.text}`);
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
                  cancelAddProperInValue={cancelAddProperInValue}
                  goBack={goBackPreviousForm}
                  selectedValueForAddProper={selectedValueForAddProper}
                  setSelectedValueForAddProper={selectedValueForAddProper}
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
                openFormForSelectedValue={openFormForSelectedValue}
                selectedValueForAddProper={selectedValueForAddProper}
                setSelectedValueForAddProper={selectedValueForAddProper}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProcess;
