import "./ProperItem.css";
import { BiHeading } from "react-icons/bi";

function ProperItem({ icon, text }) {
  return (
    <div className="pi-container">
      <div className="pi-icon-container">{icon}</div>
      <div className="pi-text-container">{text}</div>
    </div>
  );
}

export default ProperItem;
