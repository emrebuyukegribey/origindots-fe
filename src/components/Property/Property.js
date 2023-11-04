import { Checkbox, Drawer, Input } from "antd";
import { useEffect, useState } from "react";

import "./Property.css";
import DarkButton from "../UI/Buttons/DarkButton";
import LightButton from "../UI/Buttons/LightButton";
import ProperValueList from "./ProperValueList";
import { MainContext, useContext } from "../../context";
import DarkButtonBorder from "../UI/Buttons/DarkButtonBorder";

function Property({
  open,
  openPropertyDrawer,
  onClose,
  editProper,
  deleteProperValue,
  openFormForSelectedValue,
  cancelAddProperInValue,
}) {
  const { properValueList, selectedProper } = useContext(MainContext);
  const [type, setType] = useState(selectedProper ? selectedProper.type : "");
  const [title, setTitle] = useState(
    selectedProper ? selectedProper.title : ""
  );
  const [placeholder, setPlaceholder] = useState();
  const [description, setDescription] = useState();
  const [isRequired, setRequired] = useState(false);
  const [updatedField, setUpdatedFields] = useState(false);
  const [values, setValues] = useState();

  setTimeout(() => {
    if (selectedProper && selectedProper.type && !updatedField) {
      setType(selectedProper.type);
      setTitle(selectedProper.title);
      setPlaceholder(selectedProper.placeholder);
      setDescription(selectedProper.description);
      setRequired(selectedProper.isRequired);
      setValues(
        properValueList
          ?.filter((value) => value.properId === selectedProper.id)
          .map((item) => item)
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
    setDescription(e.target);
  };

  const onChangeRequired = (e) => {
    setRequired(e.target.checked);
  };

  const edit = () => {
    let updatedProper = selectedProper;
    updatedProper.isRequired = isRequired;
    updatedProper.title = title;
    updatedProper.placeholder = placeholder;
    updatedProper.description = description;
    editProper(selectedProper);
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
          <h3>Base Properties</h3>
          <div className="property-field-divider" />
          {type !== "HeaderField" && (
            <div className="property-field-container">
              <div className="property-field-label">
                Is required:
                <Checkbox
                  checked={isRequired}
                  value={isRequired}
                  onChange={onChangeRequired}
                  style={{ marginLeft: "10px" }}
                />
              </div>
            </div>
          )}
          <div className="property-field-label">Proper title</div>
          <Input value={title} onChange={onChangeName} />
        </div>
        {type !== "HeaderField" && (
          <div>
            <div className="property-field-container">
              <div className="property-field-label">Proper placeholder</div>
              <Input value={placeholder} onChange={onChangePlaceholder} />
            </div>
            <div className="property-field-container">
              <div className="property-field-label">Proper description</div>
              <Input value={description} onChange={onChangeDescription} />
            </div>
          </div>
        )}
        <div
          className="property-field-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <DarkButtonBorder
            text="Edit Base Properties"
            onClick={edit}
            style={{ width: "100%" }}
          />
        </div>
        {selectedProper &&
          (selectedProper.type === "MultiSelectField" ||
            selectedProper.type === "SingleSelectField" ||
            selectedProper.type === "DropDownField") && (
            <div style={{ marginTop: "50px" }}>
              <ProperValueList
                values={values}
                deleteProperValue={deleteProperValue}
                openPropertyDrawer={openPropertyDrawer}
                onCloseProperty={onClose}
                openFormForSelectedValue={openFormForSelectedValue}
                cancelAddProperInValue={cancelAddProperInValue}
              />
            </div>
          )}
      </Drawer>
    </>
  );
}

export default Property;
