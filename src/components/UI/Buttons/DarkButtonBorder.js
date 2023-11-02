import "./DarkButtonBorder.css";

function DarkButtonBorder({ text, onClick }) {
  return (
    <div className="dark-button-border-container" onClick={onClick}>
      <div className="dark-button-border-text">{text}</div>
    </div>
  );
}

export default DarkButtonBorder;
