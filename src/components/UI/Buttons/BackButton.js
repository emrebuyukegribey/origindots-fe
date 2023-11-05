import "./BackButton.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

function BackButton({ text, onClick }) {
  return (
    <div className="back-button-container" onClick={onClick}>
      <div className="back-button-text">
        <MdOutlineArrowBackIosNew size={30} />
      </div>
    </div>
  );
}

export default BackButton;
