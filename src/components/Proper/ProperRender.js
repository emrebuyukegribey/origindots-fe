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

export default function ProperRender(proper, deleteProper, editProper) {
  if (proper.type === "HeaderField") {
    return (
      <HeaderField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "InputField") {
    return (
      <InputField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "NumberField") {
    return (
      <NumberField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "EmailField") {
    return (
      <EmailField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "PhoneField") {
    return (
      <PhoneField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "DataField") {
    return (
      <DataField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "TimeField") {
    return (
      <TimeField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "PhotoField") {
    return (
      <PhotoField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "VideoField") {
    return (
      <VideoField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "QRField") {
    return (
      <QRField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "OCRField") {
    return (
      <OCRField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "DropDownField") {
    return (
      <DropDownField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "SingleSelectField") {
    return (
      <SingleSelectField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "MultiSelectField") {
    return (
      <MultiSelectField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  } else if (proper.type === "ProperGroupField") {
    return (
      <ProperGroupField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  }
}
