import FormDate from "./propers/FormDate";
import FormEmail from "./propers/FormEmail";
import FormHeader from "./propers/FormHeader";
import FormInput from "./propers/FormInput";
import FormNumber from "./propers/FormNumber";
import FormPhone from "./propers/FormPhone";
import FormPhoto from "./propers/FormPhoto";
import FormTime from "./propers/FormTime";

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

  if (proper.type === "PhoneField") {
    return <FormPhone proper={proper} />;
  }

  if (proper.type === "DateField") {
    return <FormDate proper={proper} />;
  }

  if (proper.type === "TimeField") {
    return <FormTime proper={proper} />;
  }

  if (proper.type === "PhotoField") {
    return <FormPhoto proper={proper} />;
  }
}
