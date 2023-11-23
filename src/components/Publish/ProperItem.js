import "./ProperItem.css";

function ProperItem({ proper }) {
  return (
    <div className="properItem-container">
      <div className="properItem-icon"></div>
      <div>
        <div className="properItem-title">{proper.title}</div>
        {proper.childCount > 0 && <div>Tikla</div>}
      </div>
    </div>
  );
}

export default ProperItem;
