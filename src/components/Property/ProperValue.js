import { Checkbox, Input, Modal } from "antd";
import "./ProperValue.css";
import {
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineEdit,
} from "react-icons/ai";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

function ProperValue({
  value,
  deleteProperValue,
  editProperValue,
  readOnlyProperValue,
  openFormForSelectedValue,
  onChangeNewProperValue,
  t,
}) {
  const [openEditForm, setOpenEditForm] = useState(false);
  const [properValue, setProperValue] = useState(value.name);

  const editValue = () => {
    editProperValue(value, properValue);
    setOpenEditForm(false);
  };

  const cancelEditForm = (e) => {
    e.preventDefault();
    setOpenEditForm(false);
  };

  const onChangeProperValue = (e) => {
    e.preventDefault();
    setProperValue(e.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="proper-value-container">
        <div className="proper-value-name">
          {/*
          <Input
            name="name"
            value={value.name}
            onChange={onChangeProperValue}
          />
  */}
          <div>{value.name}</div>
        </div>
        <div className="proper-value-button-container">
          <div className="proper-value-add-button">
            <AiOutlinePlus
              onClick={() => {
                openFormForSelectedValue(value);
              }}
            />
          </div>
          <div className="proper-value-edit-button">
            <AiOutlineEdit onClick={() => setOpenEditForm(true)} />
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
      <Modal
        title={t("Edit Proper Value")}
        open={openEditForm}
        onOk={editValue}
        onCancel={cancelEditForm}
      >
        <Input
          value={properValue}
          onChange={onChangeProperValue}
          placeholder={t("Please enter proper value name")}
        />
      </Modal>
      <div style={{ marginTop: "-8px" }}>
        <Checkbox
          onChange={(e) => readOnlyProperValue(value, e)}
          checked={value.readOnly}
        >
          Read Only
        </Checkbox>
      </div>
      <div style={{ borderBottom: "1px solid #dfdfdf" }}></div>
    </div>
  );
}

export default ProperValue;
