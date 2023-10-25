import "./ProperItem.css";
import { BiHeading } from "react-icons/bi";

function ProperItem(props) {
  const { proper } = props;
  return (
    <div className="pi-container">
      <div className="pi-icon-container">{proper.icon}</div>
      <div className="pi-text-container">{proper.text}</div>
    </div>
  );
}

export default ProperItem;
