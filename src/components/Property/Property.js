import { Drawer, Input } from "antd";
import { useEffect, useState } from "react";

import "./Property.css";
import DarkButton from "../UI/Buttons/DarkButton";
import LightButton from "../UI/Buttons/LightButton";

function Property({ open, onClose, proper, properValueList, editProper }) {
  const [type, setType] = useState(proper ? proper.type : "");
  const [title, setTitle] = useState(proper ? proper.title : "");
  const [placeholder, setPlaceholder] = useState();
  const [description, setDescription] = useState();
  const [updatedField, setUpdatedFields] = useState(false);
  const [values, setValues] = useState();

  setTimeout(() => {
    if (proper && !updatedField) {
      setType(proper.type);
      setTitle(proper.title);
      setPlaceholder(proper.placeholder);
      setDescription(proper.description);
      setValues(
        properValueList
          ?.filter((value) => value.properId === proper.id)
          .map((item) => item.name)
      );

      setUpdatedFields(true);
    }
  }, 100);

  useEffect(() => {
    setUpdatedFields(open ? true : false);
  });

  const onChangeName = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const onChangePlaceholder = (e) => {
    setPlaceholder(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const edit = () => {
    let updatedProper = proper;
    updatedProper.title = title;
    updatedProper.placeholder = placeholder;
    updatedProper.description = description;
    editProper(proper);
    setUpdatedFields(false);
    onClose();
  };

  return (
    <>
      <Drawer
        title="Proper Settings"
        placement="right"
        open={open}
        onClose={onClose}
      >
        <div className="property-field-container">
          <div className="property-field-label">Proper title : </div>
          <Input value={title} onChange={onChangeName} />
        </div>
        {type !== "HeaderField" && (
          <div>
            <div className="property-field-container">
              <div className="property-field-label">Proper placeholder : </div>
              <Input value={placeholder} onChange={onChangePlaceholder} />
            </div>
            <div className="property-field-container">
              <div className="property-field-label">Proper description : </div>
              <Input value={description} onChange={onChangeDescription} />
            </div>
          </div>
        )}

        {values && <div>{values} </div>}

        <div
          className="property-field-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "auto",
          }}
        >
          <LightButton text="Cancel" onClick={onClose} />
          <DarkButton text="Edit" onClick={edit} />
        </div>
      </Drawer>
    </>
  );
}

export default Property;
