import BackButton from "../UI/Buttons/BackButton";
import DarkButton from "../UI/Buttons/DarkButton";
import ProperItem from "./ProperItem";
import "./Publish.css";

class Node {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
}

function Publish(props) {
  function buildTree() {
    const { properList, properValueList } = props;
    console.log("properList 2: ", properList);
    console.log("properValueList 2: ", properValueList);
    const treeMap = {};

    function addToTreeMap(item) {
      const newItem = { ...item, children: [] };

      if (!treeMap[item.id]) {
        treeMap[item.id] = newItem;
      } else {
        treeMap[item.id] = { ...treeMap[item.id], ...newItem };
      }

      if (item.parentId && treeMap[item.parentId]) {
        if (!treeMap[item.parentId].children) {
          treeMap[item.parentId].children = [];
        }
        treeMap[item.parentId].children.push(treeMap[item.id]);
      }
    }

    properList.forEach((item) => addToTreeMap(item));
    properValueList.forEach((item) => addToTreeMap(item));

    const roots = Object.values(treeMap).filter((node) => !node.parentId);
    return roots;
  }

  const tree = buildTree();
  console.log(tree);

  return (
    <div className="publish-container">
      <h3>{props.t("PUBLISH")}</h3>
      <div className="publish-divider" />
      <div className="publish-body"></div>
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
