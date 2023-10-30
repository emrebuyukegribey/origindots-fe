import HeaderField from "../UI/Propers/HeaderField";
import InputField from "../UI/Propers/InputField";
import NumberField from "../UI/Propers/NumberField";
import ProperGroupField from "../UI/Propers/ProperGroupField";

export default function ProperRender(proper, deleteProper, editProper) {
  if (proper.type === "HeaderField") {
    return (
      <HeaderField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
      />
    );
  } else if (proper.type === "InputField") {
    console.log("emre1");
    return (
      <InputField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
      />
    );
  } else if (proper.type === "NumberField") {
    return (
      <NumberField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
      />
    );
  } else if (proper.type === "ProperGroupField") {
    console.log("emre2");
    console.log("proper : ", proper);
    return (
      <ProperGroupField
        proper={proper}
        deleteProper={deleteProper}
        editProper={editProper}
      />
    );
  }
}
