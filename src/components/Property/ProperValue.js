import { Input } from "antd";
import "./ProperValue.css";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

function ProperValue({ value, deleteProperValue }) {
  return (
    <div className="proper-value-container">
      <div className="proper-value-name">
        <Input value={value.name} />
      </div>
      <div className="proper-value-button-container">
        <div className="proper-value-add-button">
          <AiOutlinePlus />
        </div>
        <div
          className="proper-value-delete-button"
          onClick={() => deleteProperValue(value)}
        >
          <AiOutlineDelete />
        </div>
      </div>
    </div>
  );
}

export default ProperValue;
