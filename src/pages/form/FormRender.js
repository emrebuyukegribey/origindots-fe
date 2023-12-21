import FormData from "./propers/FormData";
import FormDate from "./propers/FormDate";
import FormDropdown from "./propers/FormDropdown";
import FormEmail from "./propers/FormEmail";
import FormHeader from "./propers/FormHeader";
import FormInput from "./propers/FormInput";
import FormMultiselect from "./propers/FormMultiselect";
import FormNumber from "./propers/FormNumber";
import FormPhone from "./propers/FormPhone";
import FormPhoto from "./propers/FormPhoto";
import FormPropergroup from "./propers/FormPropergroup";
import FormSingleselect from "./propers/FormSingleselect";
import FormTextarea from "./propers/FormTextarea";
import FormTime from "./propers/FormTime";
import FormVideo from "./propers/FormVideo";

export function FormRender({
  formValues,
  proper,
  properList,
  properValueList,
  onChangeForParent,
}) {
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

  if (proper.type === "VideoField") {
    return <FormVideo proper={proper} />;
  }

  if (proper.type === "TextareaField") {
    return <FormTextarea proper={proper} />;
  }

  if (proper.type === "DataField") {
    return <FormData proper={proper} />;
  }

  if (proper.type === "DropDownField") {
    return (
      <FormDropdown
        formValues={formValues}
        proper={proper}
        properValueList={properValueList}
        onChangeForParent={onChangeForParent}
      />
    );
  }
  if (proper.type === "ProperGroupField") {
    return (
      <FormPropergroup
        formValues={formValues}
        proper={proper}
        properList={properList}
        onChangeForParent={onChangeForParent}
      />
    );
  }

  if (proper.type === "SingleSelectField") {
    return (
      <FormSingleselect
        formValues={formValues}
        proper={proper}
        properValueList={properValueList}
        onChangeForParent={onChangeForParent}
      />
    );
  }

  if (proper.type === "MultiSelectField") {
    return (
      <FormMultiselect
        formValues={formValues}
        proper={proper}
        properValueList={properValueList}
        onChangeForParent={onChangeForParent}
      />
    );
  }
}
