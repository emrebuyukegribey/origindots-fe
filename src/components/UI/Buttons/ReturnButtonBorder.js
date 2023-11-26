import { IoIosArrowBack, IoMdReturnLeft } from "react-icons/io";
import "./ReturnButtonBorder.css";
import {
  MdKeyboardDoubleArrowLeft,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";

function ReturnButtonBorder({ text, onClick }) {
  return (
    <div className="return-button-border-container" onClick={onClick}>
      <div className="return-button-border-text">
        <MdKeyboardDoubleArrowLeft size={30} />
      </div>
    </div>
  );
}

export default ReturnButtonBorder;
