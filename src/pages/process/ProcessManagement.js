import "./ProcessManagementStyles.css";
import { withTranslation } from "react-i18next";
import { MainContext, useContext } from "../../context";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";
import DarkButtonBorder from "../../components/UI/Buttons/DarkButtonBorder";
import { useEffect, useState } from "react";
import PageHeaderMenu from "../../components/UI/PageHeaderMenu";
import {
  deleteProcess,
  deleteUser,
  getAllProcessByOwner,
  getProcessWithAllAtributes,
} from "../../services/http";
import CircleLoading from "../../components/UI/Loading/LoadingBar";
import ProcessTable from "./ProcessTable";
import { Col, Modal, Switch, message, notification } from "antd";
import ProcessItemCard from "./ProcessItemCard";
import { CiCircleAlert } from "react-icons/ci";
import ShareItemCard from "./ShareItemCard";
import { storeShareProcessTemp } from "../../services/http";

function ProcessManagement(props) {
  const { activeLeftBar } = useContext(MainContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [allProcess, setAllProcess] = useState([]);
  const [searchedAllProcess, setSearchedAllProcess] = useState([]);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [process, setProcess] = useState({});
  const [properList, setProperList] = useState([]);
  const [properValuesList, setProperValueList] = useState([]);
  const [shareAuthentication, setShareAuthentication] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);
  const [shareLocationType, setShareLocationType] = useState();
  const [shareLocationPoints, setShareLocationPoints] = useState([]);
  const [shareDate, setShareDate] = useState(false);
  const [shareStartDate, setShareStartDate] = useState();
  const [shareEndDate, setShareEndDate] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    props.setNavbarHeaderText("Process Management");
  });

  const showMessage = (type, content) => {
    setTimeout(() => {
      messageApi.open({
        type: type,
        content: content,
      });
    }, 300);
  };

  const openErrorNotification = (type, message, description) => {
    setTimeout(() => {
      notificationApi[type]({
        message: message,
        description: description,
      });
    }, 300);
  };

  const openNewProcess = () => {
    navigate("/process-management/new-process");
  };

  const getAllProcess = async () => {
    setLoading(true);
    const processByOwner = await getAllProcessByOwner();
    setAllProcess(processByOwner.data);
    setSearchedAllProcess(processByOwner.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllProcess();
  }, []);

  useEffect(() => {
    localStorage.removeItem("processId");
    localStorage.removeItem("processName");
    localStorage.removeItem("processType");
    localStorage.removeItem("processIcon");
    if (localStorage.getItem("duplicate")) {
      localStorage.removeItem("duplicate");
    }
    if (localStorage.getItem("update")) {
      localStorage.removeItem("update");
    }
  }, []);

  const showProcessInformations = async (process) => {
    setProcess(process);
    try {
      setLoading(true);
      const response = await getProcessWithAllAtributes(process.id);
      if (response.status === 200) {
        if (response.data?.properList && response.data?.properList.length > 0) {
          setProperList(response.data.properList);
        }
        if (
          response.data?.properValueList &&
          response.data?.properValueList.length > 0
        ) {
          setProperValueList(response.data.properValueList);
        }
        setShowProcessModal(true);
      }
    } catch (err) {
      console.log("error : ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProcess = async (process) => {
    try {
      setLoading(true);
      const response = await deleteProcess(process);
      if (response.status === 200) {
        showMessage("error", props.t("Deleting the process error"));
      } else {
        openErrorNotification(
          "error",
          props.t("Deleting the process error"),
          response.data.message
        );
      }
    } catch (err) {
      openErrorNotification(
        "error",
        props.t("Deleting the process error"),
        err.response.data.message
      );
    } finally {
      setLoading(false);
      // window.location.reload();
      await getAllProcess();
    }
  };

  const deleteProcessWarning = (user) => {
    Modal.confirm({
      title: props.t("Are you sure delete the process"),
      icon: <CiCircleAlert size={20} color="red" />,
      content: "",
      onOk() {
        handleDeleteProcess(user);
      },

      onCancel() { },
      okType: "danger",
    });
  };

  const cancelShowProcessInformations = () => {
    setProcess({});
    setShowProcessModal(false);
  };

  const cancelShowShareInformations = () => {
    setShowShareModal(false);

  };

  const generate8BitUniqueValue = (input) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const character = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + character;
      hash |= 0;
    }

    const maskedValue = hash & 0xFFFF;
    return maskedValue.toString(16).toUpperCase();
  }

  const getCurrentDate = () => {
    const createdDate = new Date();
    const createdDateString =
      createdDate.getFullYear() +
      "-" +
      (createdDate.getMonth() + 1) +
      "-" +
      createdDate.getDate() +
      " " +
      ("0" + createdDate.getHours()).slice(-2) +
      ":" +
      ("0" + createdDate.getMinutes()).slice(-2) +
      ":" +
      ("0" + createdDate.getSeconds()).slice(-2);

    return createdDateString;
  };

  const okShowShareInformations = async () => {

    const locationList = []
    shareLocationPoints.forEach(l => {

      locationList.push({ type: "Point", coordinates: [l.coords[0].lng, l.coords[0].lat], address: l.address })

    })

    const payload = {
      sharedKey: generate8BitUniqueValue(getCurrentDate()),
      processId: process.id,
      processName: process.name,
      hasAuth: shareAuthentication,
      hasLocation: shareLocation,
      locType: shareLocationType,
      locList: locationList,
      hasDateRange: shareDate,
      dateRangeStart: shareStartDate,
      dateRangeEnd: shareEndDate
    }


    try {
      const response = await storeShareProcessTemp(payload);

      if (response.status === 200) {
        setShowShareModal(false);
        openErrorNotification(
          "info",
          props.t("INFO"),
          "Process shared"
        );
      }
    } catch (e) {

      openErrorNotification(
        "info",
        props.t("Share error"),
        "Check your information"
      );
    }

  };

  const uniqueProperId = (proper) => {
    const uniqueId = `prp-${Date.now()}-${proper.type}-${Math.floor(
      Math.random() * 1000
    )}`;
    return uniqueId;
  };

  const uniqueProperValueId = (value) => {
    const properType = value.id.substring(0, value.id.indexOf("-"));
    const properValueUniqueId = `prp-v-${Date.now()}-${properType}-${Math.floor(
      Math.random() * 1000
    )}-value-${value.name}-${Math.floor(Math.random() * 1000)}`;

    return properValueUniqueId;
  };

  const updateProcess = async (process) => {
    try {
      setLoading(true);
      localStorage.setItem("update", "true");
      localStorage.setItem("processId", process.id);
      localStorage.setItem("processName", process.name);
      localStorage.setItem("processType", process.type);
      localStorage.setItem("processIcon", process.icon);
      const response = await getProcessWithAllAtributes(process.id);
      if (response.status === 200) {
        if (response.data?.properList && response.data?.properList.length > 0) {
          localStorage.setItem(
            "properList",
            JSON.stringify(response.data.properList)
          );
        }
        if (
          response.data?.properValueList &&
          response.data?.properValueList.length > 0
        ) {
          localStorage.setItem(
            "properValueList",
            JSON.stringify(response.data.properValueList)
          );
        }
        setTimeout(() => {
          openNewProcess();
        }, 200);
      }
    } catch (err) {
      console.log("err : ", err);
    } finally {
      setLoading(false);
    }
  };

  const duplicateProcess = async (process) => {
    try {
      setLoading(true);
      localStorage.setItem("duplicate", "true");
      localStorage.setItem("processName", "Copy of " + process.name);
      localStorage.setItem("processType", process.type);
      localStorage.setItem("processIcon", process.icon);
      const response = await getProcessWithAllAtributes(process.id);
      if (response.status === 200) {
        if (response.data?.properList && response.data?.properList.length > 0) {
          localStorage.setItem(
            "properList",
            JSON.stringify(response.data.properList)
          );
        }
        if (
          response.data?.properValueList &&
          response.data?.properValueList.length > 0
        ) {
          localStorage.setItem(
            "properValueList",
            JSON.stringify(response.data.properValueList)
          );
        }
        setTimeout(() => {
          openNewProcess();
        }, 200);
      }
    } catch (err) {
      console.log("err : ", err);
    } finally {
      setLoading(false);
    }
  };

  const shareProcess = (process) => {
    setProcess(process);
    setShowShareModal(true);
  };

  const searchProcess = (e) => {
    const value = e.target.value;
    const filteredProcess = searchedAllProcess.filter(
      (process) =>
        process.name.toLowerCase().includes(value.toLowerCase()) ||
        process.type.toLowerCase().includes(value.toLowerCase())
    );
    setAllProcess(filteredProcess);
  };

  if (loading) {
    return <CircleLoading />;
  }

  return (
    <>
      {contextHolder}
      {notificationContextHolder}
      <Navbar />
      <LeftBar />
      <div
        className="right-container"
        style={{
          width: activeLeftBar ? "calc(100% - 275px)" : "calc(100% - 70px)",
          marginLeft: activeLeftBar ? "275px" : "70px",
        }}
      >
        <div className="process-management-container">
          <div className="process-management-header-container">
            <div className="process-management-menu-container">
              <PageHeaderMenu
                buttonText={props.t("Create Process")}
                buttonOnClick={openNewProcess}
                searchOnChange={searchProcess}
                searchPlaceholder={props.t(
                  "Please enter something about the user"
                )}
              />
            </div>
          </div>
          <div className="process-management-divider" />
          <ProcessTable
            allProcess={allProcess}
            showProcessInformations={showProcessInformations}
            deleteProcess={deleteProcessWarning}
            updateProcess={updateProcess}
            duplicateProcess={duplicateProcess}
            shareProcess={shareProcess}
            t={props.t}
          />
        </div>
      </div>
      <Modal
        title={props.t("Process Informations")}
        width={800}
        open={showProcessModal}
        onOk={cancelShowProcessInformations}
        onCancel={cancelShowProcessInformations}
      >
        <div>
          <div className="user-management-divider" />
          <ProcessItemCard
            process={process}
            properList={properList}
            properValueList={properValuesList}
            t={props.t}
          />
        </div>
      </Modal>

      <Modal
        title={props.t("Share Informations")}
        width={1200}
        open={showShareModal}
        onOk={okShowShareInformations}
        onCancel={cancelShowShareInformations}
      >
        <div>
          <div className="user-management-divider" />
          <ShareItemCard
            shareAuthentication={shareAuthentication}
            setShareAuthentication={setShareAuthentication}
            shareLocation={shareLocation}
            setShareLocation={setShareLocation}
            shareLocationType={shareLocationType}
            setShareLocationType={setShareLocationType}
            shareLocationPoints={shareLocationPoints}
            setShareLocationPoints={setShareLocationPoints}
            shareDate={shareDate}
            setShareDate={setShareDate}
            shareStartDate={shareStartDate}
            setShareStartDate={setShareStartDate}
            shareEndDate={shareEndDate}
            setShareEndDate={setShareEndDate}
          />
        </div>
      </Modal>
    </>
  );
}

const ProcessManagementWithTranslation = withTranslation()(ProcessManagement);
export default ProcessManagementWithTranslation;
