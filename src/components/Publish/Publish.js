import { Tree } from "antd";
import BackButton from "../UI/Buttons/BackButton";
import DarkButton from "../UI/Buttons/DarkButton";
import ProperItem from "./ProperItem";
import "./Publish.css";

function Publish(props) {
  const combineLists = () => {
    const { properList, properValueList } = props;
    const allList = [];
    properList.forEach((element) => {
      const item = {
        id: element.id,
        title: element.title,
        key: element.title,
        parentId: element.parentId,
        childCount: element.childCount,
      };
      allList.push(item);
    });

    properValueList.forEach((element) => {
      const item = {
        id: element.id,
        title: element.name,
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
      if (obj[prop] !== null && typeof obj[prop] === "object") {
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
  console.log("treeData : ", treeData);
  return (
    <div className="publish-container">
      <h3>{props.t("PUBLISH")}</h3>
      <div className="publish-divider" />
      <div className="publish-body">
        <Tree treeData={treeData} />
      </div>
      <div className="publish-divider" />
      <div className="publish-button-container" onClick={props.previosStep}>
        <BackButton onClick={props.previosStep} text="Previos" />
        <div>
          <DarkButton
            // onClick={handlePropers}
            text={props.t("Publish")}
          />
        </div>
      </div>
    </div>
  );
}

export default Publish;
