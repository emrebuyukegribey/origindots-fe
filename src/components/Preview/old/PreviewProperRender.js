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
import DynamicInputField from "../../UI/Propers/DynamicInputField";

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
  if (proper.type === "DynamicInputField") {
    return <DynamicInputField proper={proper} key={proper.id} />;
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
