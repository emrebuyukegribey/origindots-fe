import FormEmail from "./propers/FormEmail";
import FormHeader from "./propers/FormHeader";
import FormInput from "./propers/FormInput";
import FormNumber from "./propers/FormNumber";

export function FormRender({ proper }) {
  if (proper.type === "HeaderField") {
    return <FormHeader proper={proper} />;
  }

  if (proper.type === "InputField") {
    return <FormInput proper={proper} />;
  }

  if (proper.type === "EmailField") {
    return <FormEmail proper={proper} />;
  }

  if (proper.type === "NumberField") {
    return <FormNumber proper={proper} />;
  }
}
