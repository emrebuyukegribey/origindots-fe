import "./BlueButtonLarge.css";

function BlueButtonLarge({ text, onClick }) {
  return (
    <div className="blue-button-large-container" onClick={onClick}>
      <div className="blue-button-large-text">{text}</div>
    </div>
  );
}

export default BlueButtonLarge;
