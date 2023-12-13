import { Tree } from "antd";
import ProcessItem from "./ProcessItem";
import { PiNoteBlankLight } from "react-icons/pi";
import ProcessIcons from "../../components/Process/ProcessIcons";
import { useState } from "react";
import "./ProcessItemCard.css";
import {
  BiCodeCurly,
  BiHeading,
  BiPhotoAlbum,
  BiSelectMultiple,
} from "react-icons/bi";
import { BsCursorText, BsDatabaseAdd, BsTextareaResize } from "react-icons/bs";
import { GoMultiSelect, GoNumber } from "react-icons/go";
import {
  MdAlternateEmail,
  MdOutlineDateRange,
  MdOutlineRadioButtonChecked,
} from "react-icons/md";
import {
  AiOutlinePhone,
  AiOutlineQrcode,
  AiOutlineVideoCameraAdd,
} from "react-icons/ai";
import { IoMdQrScanner, IoMdTimer } from "react-icons/io";

function ProcessItemCard(props) {
  const [showTree, setShowTree] = useState(false);

  const handleShowTree = () => {
    setShowTree(true);
  };

  const handleCancelTree = () => {
    setShowTree(false);
  };

  const properIcon = (properId) => {
    if (properId.includes("HeaderField")) {
      return <BiHeading />;
    } else if (properId.includes("InputField")) {
      return <BsCursorText />;
    } else if (properId.includes("TextareaField")) {
      return <BsTextareaResize />;
    } else if (properId.includes("NumberField")) {
      return <GoNumber />;
    } else if (properId.includes("EmailField")) {
      return <MdAlternateEmail />;
    } else if (properId.includes("DataField")) {
      return <BsDatabaseAdd />;
    } else if (properId.includes("DateField")) {
      return <MdOutlineDateRange />;
    } else if (properId.includes("TimeField")) {
      return <IoMdTimer />;
    } else if (properId.includes("PhotoField")) {
      return <BiPhotoAlbum />;
    } else if (properId.includes("VideoField")) {
      return <AiOutlineVideoCameraAdd />;
    } else if (properId.includes("QRField")) {
      return <AiOutlineQrcode />;
    } else if (properId.includes("OCRField")) {
      return <IoMdQrScanner />;
    } else if (properId.includes("DropDownField")) {
      return <GoMultiSelect />;
    } else if (properId.includes("SingleSelectField")) {
      return <MdOutlineRadioButtonChecked />;
    } else if (properId.includes("MultiSelectField")) {
      return <BiSelectMultiple />;
    } else {
      return <BiCodeCurly />;
    }
  };

  const combineLists = () => {
    const { properList, properValueList } = props;
    const allList = [];
    properList.forEach((element) => {
      const item = {
        id: element.id,
        icon: properIcon(element.id),
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

  const treeData = createTree();
  const icon =
    props.process.icon &&
    ProcessIcons.filter((icon) => icon.id.toString() === props.process.icon)[0]
      .icon;

  return (
    <>
      <div className="process-card-container">
        <ProcessItem label={props.t("Name")} content={props.process.name} />
        <ProcessItem
          label={props.t("Type")}
          content={
            props.process.type === "STATIC_LOCATION"
              ? props.t("Static Location")
              : props.t("Dynamic Location")
          }
        />
        <ProcessItem
          label={props.t("Created Date")}
          content={new Date(props.process.createdDate).toLocaleString()}
        />
        <ProcessItem
          label={props.t("Modified Date")}
          content={new Date(props.process.modifiedDate).toLocaleString()}
        />
      </div>
      <div className="process-card-divider" />
      <div className="process-card-tree-container">
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          {showTree ? (
            <div className="process-card-close-tree" onClick={handleCancelTree}>
              {props.t("Hide")}
            </div>
          ) : (
            <div className="process-card-open-tree" onClick={handleShowTree}>
              {props.t("Preview")}
            </div>
          )}
        </div>
        {showTree && <Tree showIcon={true} treeData={treeData} />}
        <div className="process-card-divider" />
      </div>
    </>
    /*
    <>
      <ProcessItem label={props.t("Name")} content={props.process.name} />
      <ProcessItem label={props.t("Type")} content={props.process.type} />
      <ProcessItem
        label={props.t("Created Date")}
        content={new Date(props.process.createdDate).toLocaleString()}
      />
      <ProcessItem
        label={props.t("Modified Date")}
        content={new Date(props.process.modifiedDate).toLocaleString()}
      />
    </>
    */
  );
}

export default ProcessItemCard;
