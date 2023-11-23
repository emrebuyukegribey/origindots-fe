import { Input } from "antd";
import "./ProperGroupFieldPreview.css";
import PreviewProperRender from "../../Preview/PreviewProperRender";

function ProperGroupFieldPreview({ proper, properList }) {
  console.log("sub propers : ", properList);
  return (
    <div className="properGroupFieldPreview-container">
      <div className="properGroupFieldPreview-name">{proper.title}</div>
      <div className="properGroupFieldPreview-input">
        {properList &&
          properList
            .filter((p) => p.parentId === proper.id)
            .map((subProper) => PreviewProperRender(subProper))}
      </div>
      <div className="properGroupFieldPreview-description">
        {proper.description}
      </div>
    </div>
  );
}

export default ProperGroupFieldPreview;
