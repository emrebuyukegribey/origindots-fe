import { Input, Modal } from "antd";
import { MainContext, useContext } from "../../context";
import DarkButtonBorder from "../UI/Buttons/DarkButtonBorder";
import ProperValue from "./ProperValue";
import "./ProperValueList.css";
import { useState } from "react";

function ProperValueList({
  values,
  deleteProperValue,
  openPropertyDrawer,
  onCloseProperty,
}) {
  const { selectedProper, setProperValueList } = useContext(MainContext);

  const [isProperValueModal, setProperValueModal] = useState(false);
  const [name, setName] = useState("");

  const deleteValue = (value) => {
    deleteProperValue(value);
  };

  const handleCancelProperValueModal = () => {
    setProperValueModal(false);
  };

  const onChangeNewProperValue = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const addNewProperValue = () => {
    const properValueUniqueId = `${selectedProper.type}-${Math.floor(
      Math.random() * 1000
    )}-value-${Math.floor(Math.random() * 1000)}`;
    const properValue = {
      id: properValueUniqueId,
      name: name,
      properId: selectedProper.id,
    };

    setProperValueList((oldProperValues) => [...oldProperValues, properValue]);
    setProperValueModal(false);
    onCloseProperty();
    setTimeout(() => {
      openPropertyDrawer(selectedProper);
    }, 100);
  };

  return (
    <>
      <h3>Proper Values Settings</h3>
      <div className="proper-value-list-divider" />
      {values?.map((element) => {
        return (
          <ProperValue
            value={element}
            deleteProperValue={deleteValue}
            key={element.id}
          />
        );
      })}
      <div className="proper-value-list-add-button">
        <DarkButtonBorder
          text="Add New Proper Value"
          onClick={() => setProperValueModal(true)}
        />
      </div>

      <Modal
        title="Add New Proper Value"
        open={isProperValueModal}
        onOk={addNewProperValue}
        onCancel={handleCancelProperValueModal}
      >
        <Input
          onChange={onChangeNewProperValue}
          placeholder="Please enter proper value name"
        />
      </Modal>
    </>
  );
}

export default ProperValueList;
