import "./LightButton.css";

function LightButton({ text, onClick }) {
  return (
    <div className="grey-button-container" onClick={onClick}>
      <div className="grey-button-text">{text}</div>
    </div>
  );
}

export default LightButton;
