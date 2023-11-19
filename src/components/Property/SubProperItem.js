import "./SubProperItem.css";

function SubProperItem({ proper }) {
  return (
    <>
      <div className="subproper-item-container">
        <div className="subproper-item-icon">{proper.icon}</div>
        <div className="subproper-item-title">{proper.title}</div>
        <div className="subproper-item-text">({proper.type})</div>
      </div>
    </>
  );
}

export default SubProperItem;
