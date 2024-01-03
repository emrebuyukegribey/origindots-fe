import "./InstagramButtonBorder.css";
import instagram from "../../../assets/icons/instagram.svg";

function InstagramButtonBorder({ text, onClick }) {
  return (
    <div className="instagram-button-border-container" onClick={onClick}>
      <img
        src={instagram}
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
      <div className="instagram-button-border-text">{text}</div>
    </div>
  );
}

export default InstagramButtonBorder;
