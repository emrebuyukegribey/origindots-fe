import "./GoogleButtonBorder.css";
import google from "../../../assets/icons/google.svg";

function GoogleButtonBorder({ text, onClick }) {
  return (
    <div className="google-button-border-container" onClick={onClick}>
      <img
        src={google}
        width="30"
        height="30"
        style={{ marginRight: "30px" }}
      />
      <div className="google-button-border-text">{text}</div>
    </div>
  );
}

export default GoogleButtonBorder;
