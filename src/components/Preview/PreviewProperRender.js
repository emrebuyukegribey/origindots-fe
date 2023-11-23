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
import DataFieldPreview from "../UI/Propers/DataFieldPreview";
import InputFieldPreview from "../UI/Propers/InputFieldPreview";

export default function PreviewProperRender(
  proper,
  deleteProper,
  editProper,
  properValueList,
  properList
) {
  console.log("proper : ", proper);
  if (proper.type === "InputField") {
    console.log("veli");
    return (
      <InputFieldPreview
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  }
  if (proper.type === "DataField") {
    console.log("fatma");
    return (
      <DataFieldPreview
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
        key={proper.id}
      />
    );
  }
}
