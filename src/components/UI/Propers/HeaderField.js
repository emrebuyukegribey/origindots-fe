import { Input } from "antd";
import "./HeaderField.css";
import { AiOutlineDelete } from "react-icons/ai";

function HeaderField({ title, description, placeholder }) {
  return (
    <div className="header-field-outer-container">
      <div className="header-field-container">
        <Input
          placeholder={placeholder}
          size="large"
          style={{
            border: "1px dashed #c1c1c1",
            fontSize: "20px",
            fontWeight: "600",
            borderRadius: "0px",
          }}
        />
      </div>
      <div className="header-field-icons-container">
        <div className="header-field-delete-icon-container">
          <AiOutlineDelete className="header-field-delete-icon" />
        </div>
      </div>
    </div>
  );
}

export default HeaderField;
