import { Button } from "antd";
import "./SubmitButtonBorder.css";

function SubmitButtonBorder(props) {
  return <Button htmlType="submit">{props.text}</Button>;
}

export default SubmitButtonBorder;
