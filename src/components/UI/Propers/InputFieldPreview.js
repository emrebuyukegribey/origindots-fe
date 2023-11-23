import { Input } from "antd";
import "./InputFieldPreview.css";

function InputFieldPreview({ proper }) {
  console.log("ali");
  return (
    <div className="inputFieldPreview-container">
      <div className="inputFieldPreview-name">{proper.title}</div>
      <div className="inputFieldPreview-input">
        <Input placeholder={proper.placeholder} size="large" />
      </div>
      <div className="inputFieldPreview-description">{proper.description}</div>
    </div>
  );
}

export default InputFieldPreview;
