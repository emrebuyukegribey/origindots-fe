import "./RedButton.css";

function RedButton({ text, onClick }) {
  return (
    <div className="rb-container" onClick={onClick}>
      <div className="rb-text">{text}</div>
    </div>
  );
}

export default RedButton;
