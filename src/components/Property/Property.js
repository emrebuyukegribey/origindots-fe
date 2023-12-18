import { Checkbox, Drawer, Input } from "antd";
import { useEffect, useState } from "react";

import "./Property.css";
import DarkButton from "../UI/Buttons/DarkButton";
import LightButton from "../UI/Buttons/LightButton";
import ProperValueList from "./ProperValueList";
import { MainContext, useContext } from "../../context";
import DarkButtonBorder from "../UI/Buttons/DarkButtonBorder";
import SubProperItemList from "./SubProperItemList";
import { withTranslation } from "react-i18next";

function Property({
  open,
  openPropertyDrawer,
  onClose,
  editProper,
  deleteProperValue,
  editProperValue,
  openFormForSelectedValue,
  properList,
  setProperList,
  properValueList,
  setProperValueList,
  selectedProper,
  t,
}) {
  const [type, setType] = useState(selectedProper ? selectedProper.type : "");
  const [title, setTitle] = useState(
    selectedProper ? selectedProper.title : ""
  );

  const [placeholder, setPlaceholder] = useState();
  const [description, setDescription] = useState();
  const [required, setRequired] = useState(false);
  const [contentInfo, setContentInfo] = useState(false);
  const [mask, setMask] = useState(false);
  const [updatedField, setUpdatedFields] = useState(false);
  const [values, setValues] = useState();

  setTimeout(() => {
    if (selectedProper && selectedProper.type && !updatedField) {
      setType(selectedProper.type);
      setTitle(selectedProper.title);
      setPlaceholder(selectedProper.placeholder);
      setDescription(selectedProper.description);
      setRequired(selectedProper.required);
      setContentInfo(selectedProper.contentInfo);
      setMask(selectedProper.mask);
      if (selectedProper.type === "ProperGroupField") {
        setValues(
          properList
            ?.filter((value) => value.parentId === selectedProper.id)
            .map((item) => item)
        );
      } else {
        setValues(
          properValueList
            ?.filter((value) => value.properId === selectedProper.id)
            .map((item) => item)
        );
      }

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

  const onChangeRequired = (e) => {
    setRequired(e.target.checked);
  };

  const onChangeContentInfo = (e) => {
    setContentInfo(e.target.checked);
  };

  const onChangeMask = (e) => {
    setMask(e.target.checked);
  };

  const edit = () => {
    let updatedProper = selectedProper;
    updatedProper.required = required;
    updatedProper.contentInfo = contentInfo;
    updatedProper.mask = mask;
    updatedProper.title = title;
    updatedProper.placeholder = placeholder;
    updatedProper.description = description;
    editProper(updatedProper);
    setUpdatedFields(false);
    onClose();
  };

  return (
    <>
      <Drawer
        title={t("Proper Settings")}
        placement="right"
        open={open}
        onClose={onClose}
      >
        <div className="property-field-container">
          <h3>{t("Base Settings")}</h3>
          <div className="property-field-divider" />
          {type !== "HeaderField" && (
            <div>
              <div className="property-field-container">
                <div className="property-field-label">
                  {t("Is required")}:
                  <Checkbox
                    checked={required}
                    value={required}
                    onChange={onChangeRequired}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
              </div>
              <div className="property-field-container">
                <div className="property-field-label">
                  {t("Is content info")}:
                  <Checkbox
                    checked={contentInfo}
                    value={contentInfo}
                    onChange={onChangeContentInfo}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
              </div>
              <div className="property-field-container">
                <div className="property-field-label">
                  {t("Has mask")}:
                  <Checkbox
                    checked={mask}
                    value={mask}
                    onChange={onChangeMask}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="property-field-label">{t("Proper title")}</div>
          <Input value={t(title)} onChange={onChangeName} />
        </div>
        {type !== "HeaderField" && (
          <div>
            <div className="property-field-container">
              <div className="property-field-label">
                {t("Proper placeholder")}
              </div>
              <Input value={t(placeholder)} onChange={onChangePlaceholder} />
            </div>
            <div className="property-field-container">
              <div className="property-field-label">
                {t("Proper description")}
              </div>
              <Input value={t(description)} onChange={onChangeDescription} />
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
            text={t("Go on")}
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
                properList={properList}
                setProperList={setProperList}
                values={values ? values : []}
                deleteProperValue={deleteProperValue}
                editProperValue={editProperValue}
                openPropertyDrawer={openPropertyDrawer}
                onCloseProperty={onClose}
                openFormForSelectedValue={openFormForSelectedValue}
                properValueList={properValueList}
                setProperValueList={setProperValueList}
                selectedProper={selectedProper}
                t={t}
              />
            </div>
          )}

        {selectedProper && selectedProper.type === "ProperGroupField" && (
          <div style={{ marginTop: "50px" }}>
            <SubProperItemList
              values={values ? values : []}
              selectedProper={selectedProper}
              openFormForSelectedValue={openFormForSelectedValue}
              t={t}
            />
          </div>
        )}
      </Drawer>
    </>
  );
}

const PropertyWithTranslation = withTranslation()(Property);
export default PropertyWithTranslation;
