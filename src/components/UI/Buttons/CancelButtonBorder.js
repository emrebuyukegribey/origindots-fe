import { Button } from "antd";
import "./CancelButtonBorder.css";

function CancelButtonBorder(props) {
  return (
    <Button danger onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

export default CancelButtonBorder;
