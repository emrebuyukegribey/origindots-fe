import { Input, TimePicker } from "antd";
import "./TimeFieldPreview.css";

function TimeFieldPreview({ proper }) {
  return (
    <div className="timeFieldPreview-container">
      <div className="timeFieldPreview-name">{proper.title}</div>
      <div className="timeFieldPreview-input">
        <TimePicker
          style={{ width: "100%" }}
          placeholder={proper.placeholder}
          size="large"
        />
      </div>
      <div className="timeFieldPreview-description">{proper.description}</div>
    </div>
  );
}

export default TimeFieldPreview;
