import FormHeader from "./propers/FormHeader";
import FormInput from "./propers/FormInput";

export function FormRender({ proper }) {
  if (proper.type === "HeaderField") {
    return <FormHeader proper={proper} />;
  }

  if (proper.type === "InputField") {
    return <FormInput proper={proper} />;
  }
}
