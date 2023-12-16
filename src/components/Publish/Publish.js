import { Tree, message, notification } from "antd";
import "./Publish.css";
import { PiNoteBlankLight } from "react-icons/pi";
import ProcessIcons from "../Process/ProcessIcons";
import {
  processDuplicate,
  processStore,
  processUpdate,
} from "../../services/http";
import DarkButtonBorder from "../UI/Buttons/DarkButtonBorder";
import BackButtonBorder from "../UI/Buttons/BackButtonBorder";
import { useNavigate } from "react-router-dom";

function Publish(props) {
  console.log("props : ", props);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  const combineLists = () => {
    const { properList, properValueList } = props;
    const allList = [];
    properList.forEach((element) => {
      const item = {
        id: element.id,
        icon: element.icon,
        title: `${props.t(element.title)} (${props.t(element.text)})`,
        key: element.title,
        parentId: element.parentId,
        childCount: element.childCount,
      };
      allList.push(item);
    });

    properValueList.forEach((element) => {
      const item = {
        id: element.id,
        icon: <PiNoteBlankLight />,
        title: `${props.t(element.name)} (${props.t("Value")})`,
        key: element.name,
        parentId: element.properId,
        childCount: element.childCount,
      };
      allList.push(item);
    });
    return allList;
  };

  function assignKeys(nodes, key) {
    let counter = 0;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].parentId === null) {
        nodes[i].key = `${counter}`;
        counter++;
      } else {
        nodes[i].key = `${key}-${counter}`;
        counter++;
      }
      if (nodes[i].children.length > 0) {
        assignKeys(nodes[i].children, nodes[i].key);
      }
    }
  }

  function removeEmptyChildren(obj) {
    for (const prop in obj) {
      if (
        obj[prop] !== null &&
        typeof obj[prop] === "object" &&
        prop === "children"
      ) {
        removeEmptyChildren(obj[prop]);
        if (Array.isArray(obj[prop]) && obj[prop].length === 0) {
          delete obj[prop];
        }
      }
    }
  }

  function createTree(list) {
    list = combineLists();
    const map = {};
    let node,
      roots = [],
      i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i;
      list[i].children = [];
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId !== null && map[node.parentId] !== undefined) {
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }

    assignKeys(roots, null);
    removeEmptyChildren(roots);
    return roots;
  }

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

  const onSubmit = async () => {
    const process = {
      id: props.processId,
      name: props.processName,
      type: props.processType,
      icon: props.processIcon,
    };
    const body = {
      process: process,
      properList: props.properList,
      properValueList: props.properValueList,
    };
    try {
      props.setCurrentStep(0);
      props.setLoading(true);
      let response;
      if (localStorage.getItem("duplicate")) {
        response = await processDuplicate(body);
        localStorage.removeItem("duplicate");
      } else if (localStorage.getItem("update")) {
        response = await processUpdate(body);
        localStorage.removeItem("update");
      } else {
        response = await processStore(body);
      }

      if (response.status === 200) {
        props.setProcessName("");
        props.setProcessType("STATIC_LOCATION");
        props.setProcessIcon(1);
        props.setProperList([]);
        props.setProperValueList([]);
        props.setCurrentStep(0);
        clearProcessInformationOnStorage();
        navigate("/process-management");
        showMessage("success", props.t("Created new process"));
      } else {
        openErrorNotification(
          "error",
          props.t("Creating new process error"),
          response.data?.message
        );
      }
    } catch (err) {
      console.log("err : ", err);
      openErrorNotification(
        "error",
        props.t("Creating new process error"),
        err.response.data?.message
      );
    } finally {
      props.setLoading(false);
    }
  };

  const clearProcessInformationOnStorage = () => {
    localStorage.removeItem("processName");
    localStorage.removeItem("processType");
    localStorage.removeItem("processIcon");
  };

  const treeData = createTree();

  return (
    <>
      {contextHolder}
      {notificationContextHolder}
      <div className="publish-container">
        <h3>{props.t("PUBLISH")}</h3>
        <div className="publish-divider" />
        <div className="publish-body">
          <div className="publish-process-container">
            <div className="publish-process-icon">
              {props.processIcon &&
                ProcessIcons.filter(
                  (icon) => icon.id.toString() === props.processIcon
                )[0].icon}
            </div>
            <div className="publish-process-name">
              {props.processName} -{" "}
              {props.processType === "STATIC_LOCATION"
                ? props.t("Static Location")
                : props.t("Dynamic Location")}
            </div>
          </div>
          <div className="publish-divider" />
          <Tree showIcon={true} treeData={treeData} />
        </div>
        <div className="publish-divider" />
        <div className="publish-button-container" onClick={props.previosStep}>
          <BackButtonBorder onClick={props.previosStep} text="Previos" />
          <div>
            <DarkButtonBorder onClick={onSubmit} text={props.t("Publish")} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Publish;
