import { InputNumber } from "antd";
import "./NumberFieldPreview.css";

function PhoneFieldPreview({ proper }) {
  return (
    <div className="numberFieldPreview-container">
      <div className="numberFieldPreview-name">{proper.title}</div>
      <div className="numberFieldPreview-input">
        <InputNumber placeholder={proper.placeholder} size="large" />
      </div>
      <div className="numberFieldPreview-description">{proper.description}</div>
    </div>
  );
}

export default PhoneFieldPreview;
