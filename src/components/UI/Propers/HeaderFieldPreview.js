import "./HeaderFieldPreview.css";

function HeaderFieldPreview({ proper }) {
  return (
    <div className="headerFieldPreview-container">
      <div className="headerFieldPreview-name">{proper.title}</div>
    </div>
  );
}

export default HeaderFieldPreview;
