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
  addValueOnFormValues,
  formValues,
  proper,
  properList,
  allProperList,
  properValueList,
  onChangeForParent,
}) {
  if (proper.type === "HeaderField") {
    return <FormHeader proper={proper} />;
  }

  if (proper.type === "InputField") {
    return (
      <FormInput proper={proper} addValueOnFormValues={addValueOnFormValues} />
    );
  }

  if (proper.type === "EmailField") {
    return (
      <FormEmail proper={proper} addValueOnFormValues={addValueOnFormValues} />
    );
  }

  if (proper.type === "NumberField") {
    return (
      <FormNumber proper={proper} addValueOnFormValues={addValueOnFormValues} />
    );
  }

  if (proper.type === "PhoneField") {
    return (
      <FormPhone proper={proper} addValueOnFormValues={addValueOnFormValues} />
    );
  }

  if (proper.type === "DateField") {
    return (
      <FormDate proper={proper} addValueOnFormValues={addValueOnFormValues} />
    );
  }

  if (proper.type === "TimeField") {
    return (
      <FormTime proper={proper} addValueOnFormValues={addValueOnFormValues} />
    );
  }

  if (proper.type === "PhotoField") {
    return (
      <FormPhoto proper={proper} addValueOnFormValues={addValueOnFormValues} />
    );
  }

  if (proper.type === "VideoField") {
    return (
      <FormVideo proper={proper} addValueOnFormValues={addValueOnFormValues} />
    );
  }

  if (proper.type === "TextareaField") {
    return (
      <FormTextarea
        proper={proper}
        addValueOnFormValues={addValueOnFormValues}
      />
    );
  }

  if (proper.type === "DataField") {
    return (
      <FormData proper={proper} addValueOnFormValues={addValueOnFormValues} />
    );
  }

  if (proper.type === "DropDownField") {
    return (
      <FormDropdown
        addValueOnFormValues={addValueOnFormValues}
        formValues={formValues}
        proper={proper}
        properList={properList}
        allProperList={allProperList}
        properValueList={properValueList}
        onChangeForParent={onChangeForParent}
      />
    );
  }
  if (proper.type === "ProperGroupField") {
    if (proper.childCount > 0) {
      return (
        <FormPropergroup
          addValueOnFormValues
          formValues={formValues}
          proper={proper}
          properList={properList}
          onChangeForParent={onChangeForParent}
        />
      );
    }
    return;
  }

  if (proper.type === "SingleSelectField") {
    return (
      <FormSingleselect
        addValueOnFormValues={addValueOnFormValues}
        formValues={formValues}
        proper={proper}
        properList={properList}
        allProperList={allProperList}
        properValueList={properValueList}
        onChangeForParent={onChangeForParent}
      />
    );
  }

  if (proper.type === "MultiSelectField") {
    return (
      <FormMultiselect
        addValueOnFormValues={addValueOnFormValues}
        formValues={formValues}
        proper={proper}
        properList={properList}
        allProperList={allProperList}
        properValueList={properValueList}
        onChangeForParent={onChangeForParent}
      />
    );
  }
}
