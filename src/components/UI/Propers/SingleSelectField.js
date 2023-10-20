import { Checkbox } from "antd";
import "./SingleSelectField.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";

function SingleSelectField({ title, description, placeholder }) {
  return (
    <div className="single-select-field-outer-container">
      <div className="single-select-field-container">
        <div className="single-select-field-title-container">
          <span className="single-select-field-title">{title}</span>
        </div>
        <Checkbox size="large">{placeholder}</Checkbox>
        <span className="single-select-field-description">{description}</span>
      </div>
      <div className="single-select-field-icons-container">
        <div className="single-select-field-edit-icon-container">
          <BiEditAlt className="single-select-field-edit-icon" />
        </div>
        <div className="single-select-field-delete-icon-container">
          <AiOutlineDelete className="single-select-field-delete-icon" />
        </div>
      </div>
    </div>
  );
}

export default SingleSelectField;
