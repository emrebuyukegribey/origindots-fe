import { getIconFromProper } from "../../util/ProperUtil";
import "./SubProperItem.css";

function SubProperItem({ proper }) {
  return (
    <>
      <div className="subproper-item-container" key={proper.id}>
        <div className="subproper-item-icon">
          {proper.icon ? proper.icon : getIconFromProper(proper)}
        </div>
        <div className="subproper-item-title">{proper.title}</div>
        <div className="subproper-item-text">({proper.type})</div>
      </div>
    </>
  );
}

export default SubProperItem;
