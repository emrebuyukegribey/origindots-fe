import { Button } from "antd";
import "./SubmitButtonBorder.css";

function SubmitButtonBorder(props) {
  return (
    <Button htmlType="submit" className="submit-ant-btn-default">
      {props.text}
    </Button>
  );
}

export default SubmitButtonBorder;
