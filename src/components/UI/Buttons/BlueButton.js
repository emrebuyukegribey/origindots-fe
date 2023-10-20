import "./BlueButton.css";

function BlueButton({ text, onClick }) {
  return (
    <div className="bb-container" onClick={onClick}>
      <div className="bb-text">{text}</div>
    </div>
  );
}

export default BlueButton;
