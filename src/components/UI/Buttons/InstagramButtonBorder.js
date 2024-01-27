import "./InstagramButtonBorder.css";
import instagram from "../../../assets/icons/instagram.svg";
import { BsInstagram } from "react-icons/bs";

function InstagramButtonBorder({ text, onClick }) {
  return (
    <div className="instagram-button-border-container" onClick={onClick}>
      <BsInstagram size={24} color="#fff" style={{ marginRight: "12px" }} />

      <div className="instagram-button-border-text">{text}</div>
    </div>
  );
}

export default InstagramButtonBorder;
