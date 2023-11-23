import { Modal } from "antd";
import ProcessIcons from "../Process/ProcessIcons";
import "./Preview.css";
import PreviewProperRender from "./PreviewProperRender";

function Preview({ properList, processName, processIcon }) {
  return (
    <div
      style={{
        padding: "20px",
        backgroundImage: `url(require(../../assets/preview/desktop.png))`,
      }}
    >
      <div className="review-container">
        <div className="review-process-container">
          <div className="review-process-icon">
            {processIcon &&
              ProcessIcons.filter(
                (icon) => icon.id.toString() === processIcon
              )[0].icon}
          </div>
          <div className="review-process-name">{processName}</div>,
        </div>
        <div className="review-propers-container">
          {properList &&
            properList.map((proper) => PreviewProperRender(proper, properList))}
        </div>
      </div>
    </div>
  );
}

export default Preview;
