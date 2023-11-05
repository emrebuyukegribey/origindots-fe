import LightButton from "../UI/Buttons/GreyButton";
import { AiOutlineTablet } from "react-icons/ai";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { SlScreenDesktop } from "react-icons/sl";
import { CiCircleAlert } from "react-icons/ci";
import { IoAddSharp } from "react-icons/io5";
import "./ProperForm.css";
import DarkButton from "../UI/Buttons/DarkButton";
import RedButton from "../UI/Buttons/RedButton";
import React, { useRef } from "react";
import ProperRender from "./ProperRender";
import { MainContext, useContext } from "../../context";
import { message, Modal } from "antd";
import { useEffect } from "react";

const { confirm } = Modal;

function ProperForm(props) {
  const { properList, setProperList, setProperValueList } =
    useContext(MainContext);
  const [messageApi, contextHolder] = message.useMessage();
  let dragStart = useRef();
  let dragOver = useRef();

  const properListForm = properList.filter((proper) =>
    props.selectedValueForAddProper
      ? proper.parentId === props.selectedValueForAddProper.id
      : proper.parentId === null
  );

  console.log(
    "props.selectedValueForAddProper : ",
    props.selectedValueForAddProper
  );
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
    setProperList(finalArr);
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
      f_arr.push({
        cpItem,
      });
    });

    setProperList(arr1);
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
      content: `Deleted all propers`,
    });
  };

  const deleteProperWarning = () => {
    if (properList && properList.length > 0) {
      confirm({
        title: "Are you sure delete all propers ?",
        icon: <CiCircleAlert size={20} color="red" />,
        content: "All created propers will be deleted !",
        onOk() {
          clearAllPropers();
        },
        onCancel() {},
        okType: "danger",
      });
    }
  };

  return (
    <div className="proper-form-container">
      {contextHolder}
      <div className="proper-header-container">
        <h3>CREATE PROPERS</h3>
        {!props.selectedValueForAddProper && (
          <div className="proper-preview-container">
            <div className="proper-preview-inner-container">
              <HiOutlineDevicePhoneMobile className="proper-preview-icon" />
              <AiOutlineTablet className="proper-preview-icon" />
              <SlScreenDesktop className="proper-preview-icon" style={{}} />
            </div>
          </div>
        )}
      </div>
      <div className="proper-form-divider" />
      <div
        className="proper-form-area"
        style={{
          justifyContent: properList && properList.length === 0 ? "center" : "",
        }}
      >
        {properList && properList.length === 0 ? (
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
              You can create your properties by clicking on the toolbar menu.
            </div>
          </div>
        ) : (
          properListForm.map((proper, index) => (
            <React.Fragment>
              <div
                className="proper-form-draggable"
                style={{ width: "100%", cursor: "move" }}
                key={index}
                draggable
                droppable
                onDragStart={(e) => onDragStart(e, index)}
                onDragEnter={(e) => onDragEnter(e, index)}
                onDragEnd={(e) => onDragEnd(e, index)}
                onDragLeave={(e) => onDragLeave(e, index)}
              >
                {ProperRender(proper, props.deleteProper, props.editProper)}
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
        {!props.selectedValueForAddProper ? (
          <div>
            <LightButton onClick={props.previosStep} text="Previos" />
          </div>
        ) : (
          <div
            className="proper-form-button-container"
            style={{ justifyContent: "flex-start" }}
          >
            <LightButton onClick={props.goBack} text="Go Back" />
            <LightButton
              onClick={props.cancelAddProperInValue}
              text="Return Base Form"
            />
          </div>
        )}
        {!props.selectedValueForAddProper && (
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "20px" }}>
              <DarkButton
                text={
                  props.selectedValueForAddProper
                    ? "Create Proper In Selected Value"
                    : "Create Propers"
                }
              />
            </div>
            <RedButton
              text="Clear All Propers"
              onClick={() =>
                properList.length > 0 ? deleteProperWarning() : ""
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProperForm;
