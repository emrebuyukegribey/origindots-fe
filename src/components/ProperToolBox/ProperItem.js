import "./ProperItem.css";

function ProperItem(props) {
  return (
    <div className="pi-container" onClick={() => props.addProper(props.proper)}>
      <div className="pi-icon-container">{props.proper.icon}</div>
      <div className="pi-text-container">{props.proper.text}</div>
    </div>
  );
}

export default ProperItem;
