import { Input } from "antd";
import "./ProperValue.css";
import {
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

function ProperValue({
  value,
  deleteProperValue,
  openFormForSelectedValue,
  onChangeNewProperValue,
}) {
  return (
    <div className="proper-value-container">
      <div className="proper-value-name">
        <Input
          name="name"
          value={value.name}
          onChange={onChangeNewProperValue}
        />
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
        <div>
          {value.childCount > 0 ? (
            <div
              className="proper-value-visible-button"
              onClick={() => {
                openFormForSelectedValue(value);
              }}
            >
              <AiOutlineEye />
            </div>
          ) : (
            <div className="proper-value-nonvisible-button">
              <AiOutlineEyeInvisible />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProperValue;
