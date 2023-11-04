import { Input } from "antd";
import "./ProperValue.css";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { isEditable } from "@testing-library/user-event/dist/utils";

function ProperValue({
  value,
  deleteProperValue,
  openFormForSelectedValue,
  onChangeNewProperValue,
}) {
  return (
    <div className="proper-value-container">
      <div className="proper-value-name">
        <Input value={value.name} onChange={onChangeNewProperValue} />
      </div>
      <div className="proper-value-button-container">
        <div className="proper-value-add-button">
          <AiOutlinePlus
            onClick={() => {
              openFormForSelectedValue(value);
            }}
          />
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
