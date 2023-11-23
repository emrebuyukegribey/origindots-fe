import BackButton from "../UI/Buttons/BackButton";
import DarkButton from "../UI/Buttons/DarkButton";
import ProperItem from "./ProperItem";
import "./Publish.css";

function Publish(props) {
  return (
    <div className="publish-container">
      <h3>{props.t("PUBLISH")}</h3>
      <div className="publish-divider" />
      <div className="publish-body">
        {props.properList.map((proper) => (
          <ProperItem proper={proper} />
        ))}
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
