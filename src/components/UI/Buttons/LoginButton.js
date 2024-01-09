import {
  FaAngleDoubleRight,
  FaAngleRight,
  FaChevronRight,
} from "react-icons/fa";
import "./LoginButton.css";
import {
  MdArrowCircleRight,
  MdChevronRight,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import { AiOutlineRight } from "react-icons/ai";
import {
  BsArrowDownRightSquare,
  BsArrowRight,
  BsChevronRight,
} from "react-icons/bs";

function LoginButton({ text, onClick }) {
  return (
    <div className="login-button-border-container" onClick={onClick}>
      <div className="login-button-border-text">{text}</div>
      <div className="login-button-border-icon-container">
        <MdKeyboardArrowRight className="login-button-border-icon" />
      </div>
    </div>
  );
}

export default LoginButton;
