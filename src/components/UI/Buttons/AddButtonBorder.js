import { AiOutlinePlus } from "react-icons/ai";
import "./AddButtonBorder.css";

function AddButtonBorder({ text, onClick }) {
  return (
    <div className="add-button-border-container" onClick={onClick}>
      <div className="add-button-border-inner-container">
        <div className="add-button-icon-container">
          <AiOutlinePlus />
        </div>
        <div className="add-button-border-text">{text}</div>
      </div>
    </div>
  );
}

export default AddButtonBorder;
