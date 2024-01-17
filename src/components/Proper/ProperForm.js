import LightButton from "../UI/Buttons/GreyButton";
import { AiOutlineTablet } from "react-icons/ai";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { SlScreenDesktop } from "react-icons/sl";
import { CiCircleAlert } from "react-icons/ci";
import { IoAddSharp } from "react-icons/io5";
import "./ProperForm.css";
import DarkButton from "../UI/Buttons/DarkButton";
import RedButton from "../UI/Buttons/RedButton";
import BackButton from "../UI/Buttons/BackButton";
import React, { useRef } from "react";
import ProperRender from "./ProperRender";
import { message, Modal } from "antd";
import { withTranslation } from "react-i18next";
import DarkButtonBorder from "../UI/Buttons/DarkButtonBorder";
import RedButtonBorder from "../UI/Buttons/RedButtonBorder";
import BackButtonBorder from "../UI/Buttons/BackButtonBorder";
import ReturnButtonBorder from "../UI/Buttons/ReturnButtonBorder";

const { confirm } = Modal;

function ProperForm({
  properList,
  properValueList,
  setProperList,
  duplicateProper,
  editProper,
  deleteProper,
  cancelAddProperInValue,
  handlePropers,
  goBack,
  previosStep,
  selectedValueForAddProper,
  setProperValueList,
  setOpenDesktopPreview,
  setOpenTabletPreview,
  setOpenMobilePreview,
  t,
}) {
  const [messageApi, contextHolder] = message.useMessage();
  let dragStart = useRef();
  let dragOver = useRef();

  const properListForm = properList.filter((proper) =>
    selectedValueForAddProper
      ? proper.parentId === selectedValueForAddProper.id
      : proper.parentId === null
  );

  const sortProperListByListNo = (list) => {
    return list.sort((a, b) => (a.listNo > b.listNo ? 1 : -1));
  };

  const updateProperList = (list) => {
    const updatedList = [...properList];
    list.forEach((proper) => {
      const updatingProperList = properList.indexOf(proper);
      updatedList[updatingProperList] = proper;
    });
    return updatedList;
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";
    dragStart.current = index;
  };

  const onDragEnter = (e, index) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";
    e.preventDefault();
    dragOver.current = index;

    const cpProperList = [...properListForm];

    let finalArr = [];

    cpProperList.forEach((item) => {
      const cpItem = item;
      cpItem.isDrag = false;
      finalArr.push(cpItem);
    });

    finalArr[index].isDrag = true;

    const updatedList = updateProperList(finalArr);
    const sortedListByListNo = sortProperListByListNo(updatedList);
    setProperList(sortedListByListNo);
  };

  const onDragEnd = (e, index) => {
    e.preventDefault();
    const arr1 = [...properListForm];

    const itemMain = arr1[dragStart.current];
    arr1.splice(dragStart.current, 1);
    arr1.splice(dragOver.current, 0, itemMain);

    dragStart.current = null;
    dragOver.current = null;

    let f_arr = [];
    arr1.forEach((item, index) => {
      const cpItem = item;
      cpItem.listNo = index;
      cpItem.isDrag = false;
      cpItem.key = item.id;
      f_arr.push({
        cpItem,
      });
    });

    const updatedList = updateProperList(arr1);
    const sortedListByListNo = sortProperListByListNo(updatedList);
    setProperList(sortedListByListNo);
  };

  const onDragLeave = (e, index) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";
    e.preventDefault();
  };

  const clearAllPropers = () => {
    setProperList([]);
    setProperValueList([]);
    messageApi.open({
      type: "error",
      content: t("Deleted all propers"),
    });
  };

  const deleteProperWarning = () => {
    if (properList && properList.length > 0) {
      confirm({
        title: t("Are you sure delete all propers"),
        icon: <CiCircleAlert size={20} color="red" />,
        content: t("All created propers will be deleted !"),
        onOk() {
          clearAllPropers();
        },
        onCancel() {},
      });
    }
  };
  return (
    <div className="proper-form-container">
      {contextHolder}
      <div className="proper-header-container">
        <h3>{t("CREATE PROPERS")}</h3>
        {!selectedValueForAddProper && (
          <div className="proper-preview-container">
            <div className="proper-preview-inner-container">
              <HiOutlineDevicePhoneMobile
                className="proper-preview-icon"
                onClick={() => setOpenMobilePreview(true)}
              />
              <AiOutlineTablet
                className="proper-preview-icon"
                onClick={() => setOpenTabletPreview(true)}
              />
              <SlScreenDesktop
                className="proper-preview-icon"
                onClick={() => {
                  setOpenDesktopPreview(true);
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="proper-form-divider" />
      <div
        className="proper-form-area"
        style={{
          justifyContent:
            properListForm && properListForm.length === 0 ? "center" : "",
        }}
      >
        {properListForm && properListForm.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IoAddSharp size={40} color="#7a7a8f" />
            <div
              style={{
                marginLeft: "20px",
                fontSize: "18px",
              }}
            >
              {t(
                "You can create your properties by clicking on the toolbar menu"
              )}
            </div>
          </div>
        ) : (
          properListForm.map((proper, index) => (
            <React.Fragment key={proper.id}>
              <div
                className="proper-form-draggable"
                style={{ width: "100%", cursor: "move" }}
                key={proper.id}
                draggable
                droppable="true"
                onDragStart={(e) => onDragStart(e, index)}
                onDragEnter={(e) => onDragEnter(e, index)}
                onDragEnd={(e) => onDragEnd(e, index)}
                onDragLeave={(e) => onDragLeave(e, index)}
              >
                {ProperRender(
                  proper,
                  duplicateProper,
                  deleteProper,
                  editProper,
                  properValueList,
                  properList,
                  t
                )}
              </div>
              {proper.isDrag ? (
                <div className="proper-form-drag-indicator"></div>
              ) : null}
            </React.Fragment>
          ))
        )}
      </div>
      <div className="proper-form-divider" />
      <div className="proper-form-button-container">
        {!selectedValueForAddProper ? (
          <div>
            <BackButtonBorder onClick={previosStep} text="Previos" />
          </div>
        ) : (
          <div
            className="proper-form-button-container"
            style={{ justifyContent: "flex-start" }}
          >
            <BackButtonBorder onClick={goBack} text="Go Back" />
            <ReturnButtonBorder onClick={cancelAddProperInValue} />
          </div>
        )}
        {!selectedValueForAddProper && (
          <div style={{ display: "flex" }}>
            <div>
              <RedButtonBorder
                text={t("Clear All Propers")}
                onClick={() =>
                  properList.length > 0 ? deleteProperWarning() : ""
                }
              />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <DarkButtonBorder
                onClick={handlePropers}
                text={
                  selectedValueForAddProper
                    ? t("Create Proper In Selected Value")
                    : t("Go on")
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const ProperFormWithTranslation = withTranslation()(ProperForm);
export default ProperFormWithTranslation;
