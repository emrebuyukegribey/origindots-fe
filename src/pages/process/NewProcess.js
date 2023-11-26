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
import ProcessIcons from "../../components/Process/ProcessIcons";
import Preview from "../../components/Preview/Preview";
import { withTranslation } from "react-i18next";
import Publish from "../../components/Publish/Publish";

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
    title: "Publish",
    content: "Publish",
  },
];

function NewProcess(props) {
  const [processName, setProcessName] = useState();
  const [processType, setProcessType] = useState();
  const [processIcon, setProcessIcon] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [openProperty, setOpenProperty] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedValueForAddProper, setSelectedValueForAddProper] = useState();
  const [properList, setProperList] = useState([]);
  const [properValueList, setProperValueList] = useState([]);
  const [selectedProper, setSelectedProper] = useState({});
  const [openDesktopPreview, setOpenDesktopPreview] = useState(false);

  const { setNavbarHeaderText, setActiveLeftBar, activeLeftBar } =
    useContext(MainContext);

  const { token } = theme.useToken();
  const items = steps.map((item) => ({
    key: item.title,
    title: props.t(item.title),
  }));

  useEffect(() => {
    setProcessName(localStorage.getItem("processName"));
    setProcessType(localStorage.getItem("processType"));

    setProcessIcon(localStorage.getItem("processIcon"));
  }, [processName, processType, processIcon]);

  useEffect(() => {
    setActiveLeftBar(false);
  }, activeLeftBar);

  if (!selectedValueForAddProper) {
    setNavbarHeaderText("Process Management > New Process");
  }

  const onCreateProcess = (process) => {
    setProcessName(process.name);
    setProcessType(process.type);
    setProcessIcon(process.icon);
    next();
  };

  const onCreatePropers = () => {
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
    const uniqueId = `prp-${Date.now()}-${shallow.type}-${Math.floor(
      Math.random() * 1000
    )}`;
    shallow.id = uniqueId;
    shallow.isDrag = false;
    shallow.isRequired = false;
    shallow.isContentInfo = false;
    shallow.hasMask = false;

    shallow.childCount = 0;
    shallow.parentId = selectedValueForAddProper
      ? selectedValueForAddProper.id
      : null;

    if (shallow.parentId) {
      shallow.listNo = properList.filter(
        (proper) => proper.parentId === shallow.parentId
      ).length;
    } else {
      shallow.listNo = properList.length;
    }

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
    // addProperValue(shallow);
    showMessage("success", `Added new proper : ${proper.text}`);
    if (shallow.parentId) {
      const parentProperValue = properValueList.filter(
        (value) => value.id === shallow.parentId
      )[0];
      if (parentProperValue && !parentProperValue.type) {
        if (parentProperValue) {
          parentProperValue.childCount++;
          const updatingProperValueIndex =
            properValueList.indexOf(parentProperValue);
          const updatedProperValueList = properValueList;
          updatedProperValueList[updatingProperValueIndex] = parentProperValue;

          setProperValueList(updatedProperValueList);
        }
      } else {
        const parentProper = properList.filter(
          (proper) => proper.id === selectedValueForAddProper.id
        )[0];
        if (
          parentProper &&
          parentProper.type &&
          parentProper.type === "ProperGroupField"
        ) {
          parentProper.childCount++;
          const updatingProperIndex = properValueList.indexOf(parentProper);
          const updatedProperList = properList;
          updatedProperList[updatingProperIndex] = parentProper;
          setProperList(updatedProperList);
        }
      }
    }
    setProperList((oldPropers) => [...oldPropers, shallow]);
  };

  const createProperValue = (proper, valueName) => {
    const properValueUniqueId = `prp-v-${Date.now()}-${
      proper.type
    }-${Math.floor(Math.random() * 1000)}-value-${valueName}-${Math.floor(
      Math.random() * 1000
    )}`;

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
      /*
      const properValue1 = createProperValue(proper, "Value1");
      const properValue2 = createProperValue(proper, "Value2");
      const properValue3 = createProperValue(proper, "Value3");
      */

      setProperValueList((oldProperValues) => [
        ...oldProperValues,
        /*properValue1,
        properValue2,
        properValue3,
        */
      ]);
    }
  };

  const openFormForSelectedValue = (value) => {
    setOpenProperty(false);
    const selectedValue = value.type
      ? `Selected Proper > ${value.title}`
      : `Selected Proper Value > ${value.name}`;
    setNavbarHeaderText(
      `Process Management > New Process > Proper > ${selectedValue}`
    );
    setSelectedValueForAddProper(value);
  };

  const cancelAddProperInValue = () => {
    setSelectedValueForAddProper(null);
    closeProperty();
  };

  const goBackPreviousForm = () => {
    let selectedProperValue;
    let parentProper;
    if (
      selectedValueForAddProper &&
      selectedValueForAddProper.type &&
      selectedValueForAddProper.type === "ProperGroupField"
    ) {
      if (
        selectedValueForAddProper.parentId &&
        selectedValueForAddProper.parentId.includes("-value-")
      ) {
        parentProper = properValueList.filter(
          (value) => value.id === selectedValueForAddProper.parentId
        )[0];
      } else {
        parentProper = properList.filter(
          (proper) => proper.id === selectedValueForAddProper.parentId
        )[0];
      }

      if (parentProper) {
        setSelectedValueForAddProper({ parentProper });
        openFormForSelectedValue(parentProper);
      } else {
        cancelAddProperInValue();
      }
    }

    if (selectedValueForAddProper && !selectedValueForAddProper.type) {
      parentProper = properList.filter(
        (proper) => proper.id === selectedValueForAddProper.properId
      )[0];

      if (parentProper && parentProper.parentId) {
        if (parentProper.parentId.includes("ProperGroupField")) {
          selectedProperValue = properList.filter(
            (value) => value.id === parentProper.parentId
          )[0];
        } else {
          selectedProperValue = properValueList.filter(
            (value) => value.id === parentProper.parentId
          )[0];
        }

        if (selectedProperValue) {
          setSelectedValueForAddProper({ selectedProperValue });
          openFormForSelectedValue(selectedProperValue);
        } else {
          cancelAddProperInValue();
        }
      } else {
        cancelAddProperInValue();
      }
    }
  };

  const deleteProperWarning = (proper) => {
    Modal.confirm({
      title: props.t("Are you sure you want to delete the proper ?"),
      content: props.t("The selected proper will be deleted !"),
      icon: <CiCircleAlert size={20} color="red" />,
      onOk() {
        deleteProperOnForm(proper);
      },
      onCancel() {},
      okType: "danger",
    });
  };

  const deleteProperOnForm = (proper) => {
    setProperList(
      properList.filter((p) => p.parentId !== proper.id && p.id !== proper.id)
    );
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

  const editProperValue = (properValue, newValue) => {
    console.log("properValue : ", properValue);
    console.log("new value : ", newValue);
    const updatingProperValue = properValueList.indexOf(properValue);
    const updatedValueList = [...properValueList];
    properValue.name = newValue;
    updatedValueList[updatingProperValue] = properValue;
    setProperValueList(updatedValueList);
    showMessage(
      "success",
      `Updated proper value on the form : ${properValue.name}`
    );

    console.log("Proper value list : ", properValueList);
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
          <div
            className="cp-body-container"
            style={{ marginLeft: currentStep === 0 ? "150px" : "300px" }}
          >
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
                  properList={properList}
                  setProperList={setProperList}
                  previosStep={prev}
                  editProper={openPropertyDrawer}
                  deleteProper={deleteProperWarning}
                  cancelAddProperInValue={cancelAddProperInValue}
                  handlePropers={onCreatePropers}
                  goBack={goBackPreviousForm}
                  selectedValueForAddProper={selectedValueForAddProper}
                  setSelectedValueForAddProper={selectedValueForAddProper}
                  properValueList={properValueList}
                  setProperValueList={setProperValueList}
                  openDesktopPreview={openDesktopPreview}
                  setOpenDesktopPreview={setOpenDesktopPreview}
                  t={props.t}
                />
              )}
              {currentStep === 2 && (
                <div>
                  <Publish
                    properList={properList}
                    properValueList={properValueList}
                    processName={processName}
                    processType={processType}
                    processIcon={processIcon}
                    previosStep={prev}
                    t={props.t}
                  />
                </div>
              )}
            </div>
            <div>
              <Property
                open={openProperty}
                openPropertyDrawer={openPropertyDrawer}
                onClose={closeProperty}
                editProper={editProperOnForm}
                deleteProperValue={deleteProperValue}
                editProperValue={editProperValue}
                openFormForSelectedValue={openFormForSelectedValue}
                selectedValueForAddProper={selectedValueForAddProper}
                setSelectedValueForAddProper={selectedValueForAddProper}
                properList={properList}
                setProperList={setProperList}
                properValueList={properValueList}
                setProperValueList={setProperValueList}
                selectedProper={selectedProper}
                t={props.t}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        centered
        open={openDesktopPreview}
        onOk={() => setOpenDesktopPreview(false)}
        onCancel={() => setOpenDesktopPreview(false)}
        width={900}
      >
        <Preview
          properList={properList}
          processName={processName}
          processType={processType}
          processIcon={processIcon}
        />
      </Modal>
    </>
  );
}

const NewProcessWithTranslation = withTranslation()(NewProcess);
export default NewProcessWithTranslation;
