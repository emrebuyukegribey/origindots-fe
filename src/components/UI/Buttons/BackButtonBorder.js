import { IoIosArrowBack } from "react-icons/io";
import "./BackButtonBorder.css";
import { MdKeyboardArrowLeft, MdOutlineArrowBackIosNew } from "react-icons/md";

function BackButtonBorder({ text, onClick }) {
  return (
    <div className="back-button-border-container" onClick={onClick}>
      <div className="back-button-border-text">
        <MdKeyboardArrowLeft size={30} />
      </div>
    </div>
  );
}

export default BackButtonBorder;
