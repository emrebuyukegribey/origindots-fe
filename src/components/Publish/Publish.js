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
  const createTree = () => {
    const { properList, properValueList } = props;
    console.log("PROPER LIST : ", properList);
    console.log("PROPER VALUE LIST : ", properValueList);
    let tree = [];
    if (properList && properList.length > 0) {
      properList.forEach((proper) => {
        if (proper.childCount === 0) {
          tree.push({ title: proper.title, key: proper.title });
        } else {
          console.log("emre");

          const children = [];
          properList
            .filter((subProper) => subProper.parentId === proper.id)
            .map((s) => {
              console.log("s : ", s);
              const sub = { title: s.title, key: s.title };
              children.push(sub);
            });
          tree.push({ title: proper.title, key: proper.title, children });
          if (properValueList && properValueList.length > 0) {
            properValueList
              .filter((subValue) => subValue.parentId === proper.id)
              .map((v) => {
                const subVal = {
                  title: v.name,
                  key: v.name,
                };
                if (v.childCount > 0) {
                  const children = [];
                  properList
                    .filter((p) => p.parentId === v.id)
                    .map((v) => {
                      console.log("v : ", v);
                      children.push(v);
                    });
                  tree.push({
                    subVal,
                    children,
                  });
                }
              });
          }
        }
      });
    }
    console.log("tree : ", tree);
  };

  const tree = createTree();

  console.log(tree); // Ağaç yapısını konsola yazdır

  return (
    <div className="publish-container">
      <h3>{props.t("PUBLISH")}</h3>
      <div className="publish-divider" />
      <div className="publish-body">{createTree}</div>
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
