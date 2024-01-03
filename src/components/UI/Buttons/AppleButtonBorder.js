import "./AppleButtonBorder.css";
import apple from "../../../assets/icons/apple.svg";

function AppleButtonBorder({ text, onClick }) {
  return (
    <div className="apple-button-border-container" onClick={onClick}>
      <img
        src={apple}
        width="27"
        height="27"
        style={{
          padding: "3px",
          width: "32px",
          height: "32px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          marginRight: "30px",
        }}
      />
      <div className="apple-button-border-text">{text}</div>
    </div>
  );
}

export default AppleButtonBorder;
