import "./RedButtonBorder.css";

function RedButtonBorder({ text, onClick }) {
  return (
    <div className="red-button-border-container" onClick={onClick}>
      <div className="red-button-border-text">{text}</div>
    </div>
  );
}

export default RedButtonBorder;
