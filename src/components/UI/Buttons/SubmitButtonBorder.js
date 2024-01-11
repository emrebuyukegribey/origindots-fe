import { Button } from "antd";
import "./SubmitButtonBorder.css";

function SubmitButtonBorder(props) {
  return (
    <Button
      htmlType="submit"
      className="submit-ant-btn-default"
      style={{
        width: "150px",
        height: "40px",
      }}
    >
      {props.text}
    </Button>
  );
}

export default SubmitButtonBorder;
