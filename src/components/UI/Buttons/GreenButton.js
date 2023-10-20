import "./GreenButton.css";

function GreenButton({ text, onClick }) {
  return (
    <div className="gb-container" onClick={onClick}>
      <div className="gb-text">{text}</div>
    </div>
  );
}

export default GreenButton;
