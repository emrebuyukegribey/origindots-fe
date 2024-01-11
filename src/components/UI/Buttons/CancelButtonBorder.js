import { Button } from "antd";
import "./CancelButtonBorder.css";

function CancelButtonBorder(props) {
  return (
    <Button
      danger
      size="small"
      onClick={props.onClick}
      style={{
        borderRadius: "30px",
        width: "150px",
        height: "40px",
      }}
    >
      {props.text}
    </Button>
  );
}

export default CancelButtonBorder;
