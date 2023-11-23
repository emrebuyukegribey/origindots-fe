import { withTranslation } from "react-i18next";
import "./ProperItem.css";

function ProperItem(props) {
  return (
    <div className="pi-container" onClick={() => props.addProper(props.proper)}>
      <div className="pi-icon-container">{props.proper.icon}</div>
      <div className="pi-text-container">{props.t(`${props.proper.text}`)}</div>
    </div>
  );
}

const ProperItemWithTranslation = withTranslation()(ProperItem);
export default ProperItemWithTranslation;
