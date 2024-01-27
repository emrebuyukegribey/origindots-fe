import EmailField from "../../UI/Propers/EmailField";
import HeaderField from "../../UI/Propers/HeaderField";
import InputField from "../../UI/Propers/InputField";
import NumberField from "../../UI/Propers/NumberField";
import PhoneField from "../../UI/Propers/PhoneField";
import DataField from "../../UI/Propers/DataField";
import TimeField from "../../UI/Propers/TimeField";
import ProperGroupField from "../../UI/Propers/ProperGroupField";
import PhotoField from "../../UI/Propers/PhotoField";
import VideoField from "../../UI/Propers/VideoField";
import QRField from "../../UI/Propers/QRField";
import OCRField from "../../UI/Propers/OCRField";
import DropDownField from "../../UI/Propers/DropDownField";
import MultiSelectField from "../../UI/Propers/MultiSelectField";
import SingleSelectField from "../../UI/Propers/SingleSelectField";
import DataFieldPreview from "../../UI/Propers/DataFieldPreview";
import InputFieldPreview from "../../UI/Propers/InputFieldPreview";
import EmailFieldPreview from "../../UI/Propers/EmailFieldPreview";
import HeaderFieldPreview from "../../UI/Propers/HeaderFieldPreview";
import NumberFieldPreview from "../../UI/Propers/NumberFieldPreview";
import PhoneFieldPreview from "../../UI/Propers/PhoneFieldPreview";
import OCRFieldPreview from "../../UI/Propers/OCRFieldPreview";
import PhotoFieldPreview from "../../UI/Propers/PhotoFieldPreview";
import QRFieldPreview from "../../UI/Propers/QRFieldPreview";
import TimeFieldPreview from "../../UI/Propers/TimeFieldPreview";
import DateFieldPreview from "../../UI/Propers/DateFieldPreview";
import ProperGroupFieldPreview from "../../UI/Propers/ProperGroupFieldPreview";

export default function PreviewProperRender(
  proper,
  properList,
  properValueList
) {
  if (proper.type === "HeaderField") {
    return <HeaderFieldPreview proper={proper} key={proper.id} />;
  }
  if (proper.type === "InputField") {
    return <InputFieldPreview proper={proper} key={proper.id} />;
  }
  if (proper.type === "TextareaField") {
    return <InputFieldPreview proper={proper} key={proper.id} />;
  }
  if (proper.type === "NumberField") {
    return <NumberFieldPreview proper={proper} key={proper.id} />;
  }
  if (proper.type === "EmailField") {
    return <EmailFieldPreview proper={proper} key={proper.id} />;
  }
  if (proper.type === "PhoneField") {
    return <PhoneFieldPreview proper={proper} key={proper.id} />;
  }
  if (proper.type === "DataField") {
    return <DataFieldPreview proper={proper} key={proper.id} />;
  }
  if (proper.type === "PhotoField") {
    return <PhotoFieldPreview proper={proper} key={proper.id} />;
  }
  if (proper.type === "QRField") {
    return <QRFieldPreview proper={proper} key={proper.id} />;
  }
  if (proper.type === "OCRField") {
    return <OCRFieldPreview proper={proper} key={proper.id} />;
  }
  if (proper.type === "TimeField") {
    return <TimeFieldPreview proper={proper} key={proper.id} />;
  }
  if (proper.type === "DateField") {
    return <DateFieldPreview proper={proper} key={proper.id} />;
  }

  if (proper.type === "ProperGroupField") {
    return (
      <ProperGroupFieldPreview
        proper={proper}
        properList={properList}
        key={proper.id}
      />
    );
  }
}
