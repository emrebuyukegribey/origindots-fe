import "./BackButton.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

function BackButton({ text, onClick }) {
  return (
    <div className="back-button-container" onClick={onClick}>
      <div className="back-button-text">
        <MdOutlineArrowBackIosNew size={36} />
      </div>
    </div>
  );
}

export default BackButton;
