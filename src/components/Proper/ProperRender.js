import EmailField from "../UI/Propers/EmailField";
import HeaderField from "../UI/Propers/HeaderField";
import InputField from "../UI/Propers/InputField";
import NumberField from "../UI/Propers/NumberField";
import PhoneField from "../UI/Propers/PhoneField";
import DataField from "../UI/Propers/DataField";
import TimeField from "../UI/Propers/TimeField";
import ProperGroupField from "../UI/Propers/ProperGroupField";
import PhotoField from "../UI/Propers/PhotoField";
import VideoField from "../UI/Propers/VideoField";
import QRField from "../UI/Propers/QRField";
import OCRField from "../UI/Propers/OCRField";
import DropDownField from "../UI/Propers/DropDownField";
import MultiSelectField from "../UI/Propers/MultiSelectField";
import SingleSelectField from "../UI/Propers/SingleSelectField";
import DateField from "../UI/Propers/DateField";
import { withTranslation } from "react-i18next";
import TextareaField from "../UI/Propers/TextareaField";
import ExplanationField from "../UI/Propers/ExplanationField";

function ProperRender(
  proper,
  duplicateProper,
  deleteProper,
  editProper,
  properValueList,
  properList,
  t
) {
  if (proper.type === "HeaderField") {
    return (
      <HeaderField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "ExplanationField") {
    return (
      <ExplanationField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "InputField") {
    return (
      <InputField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "TextareaField") {
    return (
      <TextareaField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "NumberField") {
    return (
      <NumberField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "EmailField") {
    return (
      <EmailField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "PhoneField") {
    return (
      <PhoneField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "DataField") {
    return (
      <DataField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "DateField") {
    return (
      <DateField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "TimeField") {
    return (
      <TimeField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "PhotoField") {
    return (
      <PhotoField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "VideoField") {
    return (
      <VideoField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "QRField") {
    return (
      <QRField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "OCRField") {
    return (
      <OCRField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        t={t}
      />
    );
  } else if (proper.type === "DropDownField") {
    return (
      <DropDownField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        properValueList={properValueList}
        t={t}
      />
    );
  } else if (proper.type === "SingleSelectField") {
    return (
      <SingleSelectField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        properValueList={properValueList}
        t={t}
      />
    );
  } else if (proper.type === "MultiSelectField") {
    return (
      <MultiSelectField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        properValueList={properValueList}
        t={t}
      />
    );
  } else if (proper.type === "ProperGroupField") {
    return (
      <ProperGroupField
        proper={proper}
        duplicateProper={duplicateProper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
        properList={properList}
        t={t}
      />
    );
  }
}

export default ProperRender;
