import "./GoogleButtonBorder.css";
import google from "../../../assets/icons/google.svg";

function GoogleButtonBorder({ text, onClick }) {
  return (
    <div className="google-button-border-container" onClick={onClick}>
      <img
        src={google}
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
      <div className="google-button-border-text">{text}</div>
    </div>
  );
}

export default GoogleButtonBorder;
