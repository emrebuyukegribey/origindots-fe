import React from "react";
import { useEffect, useState } from "react";
import ProperToolBox from "../../components/ProperToolBox/ProperToolBox";
import { useContext, MainContext } from "../../context";
import "./NewProcess.css";
import ProcessForm from "../../components/Process/ProcessForm";
import ProperForm from "../../components/Proper/ProperForm";
import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";
import { Steps, message, Modal } from "antd";
import Property from "../../components/Property/Property";
import { CiCircleAlert } from "react-icons/ci";
import ProcessIcons from "../../components/Process/ProcessIcons";
// import Preview from "../../components/Preview/old/Preview";
import { withTranslation } from "react-i18next";
import Publish from "../../components/Publish/Publish";
import CircleLoading from "../../components/UI/Loading/LoadingBar";
import { v4 as uuidv4 } from "uuid";
import Preview from "../../components/Preview/Preview";

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
  const [loading, setLoading] = useState(false);

  const [processId, setProcessId] = useState();
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
  const [openTabletPreview, setOpenTabletPreview] = useState(false);
  const [openMobilePreview, setOpenMobilePreview] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [openProcessBar, setOpenProcessBar] = useState(false);
  const [dynamicInputs, setDynamicInputs] = useState([]);

  const { setNavbarHeaderText, setActiveLeftBar, activeLeftBar } =
    useContext(MainContext);

  const items = steps.map((item) => ({
    key: item.title,
    title: props.t(item.title),
  }));

  useEffect(() => {
    if (localStorage.getItem("properList")) {
      const duplicateProperList = JSON.parse(
        localStorage.getItem("properList") || []
      );
      setProperList(duplicateProperList);
      localStorage.removeItem("properList");
    }
    if (localStorage.getItem("properValueList")) {
      const duplicateProperValueList = JSON.parse(
        localStorage.getItem("properValueList") || []
      );
      setProperValueList(duplicateProperValueList);
      localStorage.removeItem("properValueList");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("duplicate")) {
      setDuplicate(true);
    }
  }, []);

  useEffect(() => {
    setProcessId(
      localStorage.getItem("processId") ? localStorage.getItem("processId") : ""
    );

    setProcessName(
      localStorage.getItem("processName")
        ? localStorage.getItem("processName")
        : ""
    );
    setProcessType(
      localStorage.getItem("processType")
        ? localStorage.getItem("processType")
        : ""
    );

    setProcessIcon(
      localStorage.getItem("processIcon")
        ? localStorage.getItem("processIcon")
        : ProcessIcons[0].icon
    );
  }, [processName, processType, processIcon]);

  useEffect(() => {
    setActiveLeftBar(false);
    if (!selectedValueForAddProper) {
      props.setNavbarHeaderText("Process Management > New Process");
    }
  }, []);

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
    shallow.required = false;
    shallow.contentInfo = false;
    shallow.mask = false;
    shallow.unitValue = false;

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
    localStorage.setItem("openingProperty", "true");
    setLoading(true);
    const shallow = uniqueProper(proper);
    setSelectedProper(shallow);
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

    setTimeout(() => {
      openPropertyDrawer(shallow);
      setLoading(false);
      // localStorage.removeItem("openingProperty");
    }, 100);
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
    });
  };

  function createDataID(prefix, properType) {
    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 100);

    if (prefix === "prp") {
      return `${prefix}-${timestamp}-${properType}-${randomPart}`;
    } else {
      return `${properType}-${timestamp}-${prefix}-${randomPart}`;
    }
  }

  /*
  function createUUID() {
    return uuidv4();
  }
  */

  function splitID(payload) {
    return payload.split("-");
  }

  const duplicateProperOnForm = (baseItem) => {
    const tempList = [];
    baseItem["datatype"] = "proper";
    const parentId = baseItem.parentId;
    tempList.push(Object.assign({}, baseItem));
    function findRelatedItemsRecursively(currentItem) {
      if (
        currentItem.id.includes("ProperGroupField") ||
        currentItem.id.includes("value")
      ) {
        const childPropers = properList.filter(
          (proper) => proper.parentId === currentItem.id
        );
        childPropers.forEach((element) => {
          element["datatype"] = "proper";
          tempList.push(Object.assign({}, element));
        });
      } else {
        const childValues = properValueList.filter(
          (value) => value.properId === currentItem.id
        );
        childValues.forEach((element) => {
          element["datatype"] = "value";
          tempList.push(Object.assign({}, element));
        });
      }
    }

    for (var i = 0; i < tempList.length; i++) {
      if (tempList[i].childCount > 0) {
        findRelatedItemsRecursively(tempList[i]);
      }
    }
    const updatedList = changeID(tempList);
    const newList = createNewCopyList(tempList, updatedList);

    newList.length > 0
      ? (newList[0].parentId = parentId)
      : (newList[0].parentId = null);
    copyProperAndValueOfList(newList);
  };

  function changeID(payload) {
    const idMap = {};
    payload.forEach((p) => {
      if (p["datatype"] == "proper") {
        const [prefix, , properType] = splitID(p.id);
        idMap[p.id] = createDataID(prefix, properType);
      } else {
        const [properType, , prefix] = splitID(p.id);
        idMap[p.id] = createDataID(prefix, properType);
      }
    });
    return idMap;
  }

  function createNewCopyList(coppiedItem, keyList) {
    var newList = [];
    var i = 0;
    coppiedItem.forEach((c) => {
      newList.push(Object.assign({}, c));
      newList[i].id = keyList[c.id];

      if (c.parentId !== null) newList[i].parentId = keyList[c.parentId];

      if (c.properId !== null) newList[i].properId = keyList[c.properId];

      i++;
    });
    return newList;
  }

  const copyProperAndValueOfList = (relatedItems) => {
    setLoading(true);
    const pList = properList;
    const vList = properValueList;
    relatedItems.forEach((element) => {
      if (element.id.includes("value")) {
        vList.push(element);
      } else {
        pList.push(element);
      }
    });
    setProperList(pList);
    setProperValueList(vList);
    setTimeout(() => {
      setLoading(false);
      const selectedProper = relatedItems.filter(
        (p) => p.type === "ProperGroupField"
      )[0];
      openPropertyDrawer(selectedProper);
    }, 100);

    setTimeout(() => {
      showMessage("success", `Duplicated proper group `);
    }, 300);
  };

  const deleteProperOnForm = (proper) => {
    setProperList(
      properList.filter((p) => p.parentId !== proper.id && p.id !== proper.id)
    );
    setProperValueList(properValueList.filter((v) => v.properId !== proper.id));
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
    const updatingProperValue = properValueList.indexOf(properValue);
    const updatedValueList = [...properValueList];
    properValue.name = newValue;
    updatedValueList[updatingProperValue] = properValue;
    setProperValueList(updatedValueList);
    showMessage(
      "success",
      `Updated proper value on the form : ${properValue.name}`
    );
  };

  const readOnlyProperValue = (properValue, readOnly) => {
    properValue.readOnly = readOnly.target.checked;
    const updatingProperValue = properValueList.indexOf(properValue);
    const updatedValueList = [...properValueList];
    updatedValueList[updatingProperValue] = properValue;
    setProperValueList(updatedValueList);
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

  if (loading) {
    return <CircleLoading />;
  }

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
              <ProperToolBox
                addProper={addProperOnForm}
                openProcessBar={openProcessBar}
                setOpenProcessBar={setOpenProcessBar}
              />
            </div>
          )}
          <div
            className="cp-body-container"
            style={{
              marginLeft:
                currentStep === 0
                  ? "150px"
                  : openProcessBar
                  ? "300px"
                  : "150px",
            }}
          >
            <div className="cp-body-top-container">
              <Steps current={currentStep} items={items} />
            </div>
            <div className="cp-process-form-container">
              {currentStep === 0 && <ProcessForm onClick={onCreateProcess} />}
              {currentStep === 1 && (
                <ProperForm
                  properList={properList}
                  setProperList={setProperList}
                  previosStep={prev}
                  duplicateProper={duplicateProperOnForm}
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
                  setOpenTabletPreview={setOpenTabletPreview}
                  setOpenMobilePreview={setOpenMobilePreview}
                  t={props.t}
                  dynamicInputs={dynamicInputs}
                  setDynamicInputs={setDynamicInputs}
                />
              )}
              {currentStep === 2 && (
                <div>
                  <Publish
                    properList={properList}
                    setProperList={setProperList}
                    properValueList={properValueList}
                    setProperValueList={setProperValueList}
                    processId={processId}
                    processName={processName}
                    setProcessName={setProcessName}
                    processType={processType}
                    setProcessType={setProcessType}
                    processIcon={processIcon}
                    setProcessIcon={setProcessIcon}
                    previosStep={prev}
                    setCurrentStep={setCurrentStep}
                    setLoading={setLoading}
                    duplicate={duplicate}
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
                readOnlyProperValue={readOnlyProperValue}
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
        width={1100}
      >
        <div style={{ height: "700px", overflow: "auto", marginTop: "30px" }}>
          <Preview
            propers={properList}
            properValues={properValueList}
            processName={processName}
            processType={processType}
            processIcon={processIcon}
          />
        </div>
      </Modal>

      <Modal
        centered
        open={openTabletPreview}
        onOk={() => setOpenTabletPreview(false)}
        onCancel={() => setOpenTabletPreview(false)}
        width={1000}
      >
        <div style={{ height: "500px", overflow: "auto", marginTop: "30px" }}>
          <Preview
            propers={properList}
            properValues={properValueList}
            processName={processName}
            processType={processType}
            processIcon={processIcon}
          />
        </div>
      </Modal>

      <Modal
        centered
        open={openMobilePreview}
        onOk={() => setOpenMobilePreview(false)}
        onCancel={() => setOpenMobilePreview(false)}
        width={475}
      >
        <div style={{ height: "700px", overflow: "auto", marginTop: "30px" }}>
          <Preview
            propers={properList}
            properValues={properValueList}
            processName={processName}
            processType={processType}
            processIcon={processIcon}
          />
        </div>
      </Modal>
    </>
  );
}

const NewProcessWithTranslation = withTranslation()(NewProcess);
export default NewProcessWithTranslation;
