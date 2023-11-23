import { DatePicker } from "antd";
import "./DateFieldPreview.css";

function DateFieldPreview({ proper }) {
  return (
    <div className="timeFieldPreview-container">
      <div className="timeFieldPreview-name">{proper.title}</div>
      <div className="timeFieldPreview-input">
        <DatePicker
          style={{ width: "100%" }}
          placeholder={proper.placeholder}
          size="large"
        />
      </div>
      <div className="timeFieldPreview-description">{proper.description}</div>
    </div>
  );
}

export default DateFieldPreview;
