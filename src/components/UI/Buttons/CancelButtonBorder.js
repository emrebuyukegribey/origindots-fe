import { Button } from "antd";
import "./CancelButtonBorder.css";

function CancelButtonBorder(props) {
  return (
    <Button danger size="small" onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

export default CancelButtonBorder;
