import "./AppleButtonBorder.css";
import apple from "../../../assets/icons/apple.svg";

function AppleButtonBorder({ text, onClick }) {
  return (
    <div className="apple-button-border-container" onClick={onClick}>
      <img src={apple} width="30" height="30" style={{ marginRight: "30px" }} />
      <div className="apple-button-border-text">{text}</div>
    </div>
  );
}

export default AppleButtonBorder;
