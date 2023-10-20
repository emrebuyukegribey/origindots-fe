import "./DarkButton.css";

function DarkButton({ text, onClick }) {
  return (
    <div className="dark-button-container" onClick={onClick}>
      <div className="dark-button-text">{text}</div>
    </div>
  );
}

export default DarkButton;
