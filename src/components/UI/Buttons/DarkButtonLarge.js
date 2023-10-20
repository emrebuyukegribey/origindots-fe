import "./DarkButtonLarge.css";

function DarkButtonLarge({ text, onClick }) {
  return (
    <div className="dark-button-large-container" onClick={onClick}>
      <div className="dark-button-large-text">{text}</div>
    </div>
  );
}

export default DarkButtonLarge;
