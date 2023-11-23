import { Input } from "antd";
import "./EmailFieldPreview.css";

function EmailFieldPreview({ proper }) {
  return (
    <div className="emailFieldPreview-container">
      <div className="emailFieldPreview-name">{proper.title}</div>
      <div className="emailFieldPreview-input">
        <Input placeholder={proper.placeholder} size="large" />
      </div>
      <div className="emailFieldPreview-description">{proper.description}</div>
    </div>
  );
}

export default EmailFieldPreview;
