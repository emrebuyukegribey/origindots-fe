import {
  BiHeading,
  BiPhotoAlbum,
  BiSelectMultiple,
  BiCodeCurly,
  BiCommentDetail,
} from "react-icons/bi";
import { BsCursorText, BsDatabaseAdd, BsTextareaResize } from "react-icons/bs";
import { GoNumber, GoMultiSelect } from "react-icons/go";
import {
  MdAlternateEmail,
  MdOutlineDateRange,
  MdOutlineRadioButtonChecked,
  MdTextRotateVertical,
} from "react-icons/md";
import {
  AiOutlinePhone,
  AiOutlineVideoCameraAdd,
  AiOutlineQrcode,
} from "react-icons/ai";
import { IoMdQrScanner, IoMdTimer } from "react-icons/io";
import HeaderField from "../UI/Propers/HeaderField";
import InputField from "../UI/Propers/InputField";
import NumberField from "../UI/Propers/NumberField";
import EmailField from "../UI/Propers/EmailField";
import PhoneField from "../UI/Propers/PhoneField";
import DataField from "../UI/Propers/DataField";
import TimeField from "../UI/Propers/TimeField";
import PhotoField from "../UI/Propers/PhotoField";
import VideoField from "../UI/Propers/VideoField";
import QRField from "../UI/Propers/QRField";
import MultiSelectField from "../UI/Propers/DropDownField";
import SingleSelectField from "../UI/Propers/SingleSelectField";
import ServiceUrlField from "../UI/Propers/ServiceUrlField";
import ProperGroupField from "../UI/Propers/ProperGroupField";
import DateField from "../UI/Propers/DateField";
import TextareaField from "../UI/Propers/TextareaField";
import ExplanationField from "../UI/Propers/ExplanationField";
import DynamicInputField from "../UI/Propers/DynamicInputField";

const ProperItems = [
  {
    id: 1,
    icon: <BiHeading />,
    text: "Header",
    type: "HeaderField",
    title: "Header",
  },
  {
    id: 18,
    icon: <BiCommentDetail />,
    text: "Explanation",
    type: "ExplanationField",
    title: "Explanation",
  },
  {
    id: 2,
    icon: <BsCursorText />,
    text: "Text Input",
    type: "InputField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 19,
    icon: <MdTextRotateVertical />,
    text: "Dynamic Input",
    type: "DynamicInputField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 3,
    icon: <BsTextareaResize />,
    text: "Textarea Input",
    type: "TextareaField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 4,
    icon: <GoNumber />,
    text: "Number Input",
    type: "NumberField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 5,
    icon: <MdAlternateEmail />,
    text: "Email Input",
    type: "EmailField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 6,
    icon: <AiOutlinePhone />,
    text: "Phone Input",
    type: "PhoneField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 7,
    icon: <BsDatabaseAdd />,
    text: "Data Input",
    type: "DataField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 8,
    icon: <MdOutlineDateRange />,
    text: "Date Input",
    type: "DateField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 9,
    icon: <IoMdTimer />,
    text: "Time Input",
    type: "TimeField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 10,
    icon: <BiPhotoAlbum />,
    text: "Photo",
    type: "PhotoField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 11,
    icon: <AiOutlineVideoCameraAdd />,
    text: "Video",
    type: "VideoField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 12,
    icon: <AiOutlineQrcode />,
    text: "QR",
    type: "QRField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 13,
    icon: <IoMdQrScanner />,
    text: "OCR",
    type: "OCRField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 14,
    icon: <GoMultiSelect />,
    text: "Drop Down List",
    type: "DropDownField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 15,
    icon: <MdOutlineRadioButtonChecked />,
    text: "Single Select",
    type: "SingleSelectField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 16,
    icon: <BiSelectMultiple />,
    text: "Multi Select",
    type: "MultiSelectField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },

  /*
  {
    id: 14,
    icon: <AiOutlineBorderlessTable />,
    text: "Constant",
    type: "ConstantField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 15,
    icon: <RiAiGenerate />,
    text: "Auto Generate",
    type: "AutoGenerateField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 16,
    icon: <BiCodeCurly />,
    text: "Service Url",
    type: "ServiceUrlField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  */
  {
    id: 17,
    icon: <BiCodeCurly />,
    text: "Proper Group",
    type: "ProperGroupField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
];

export const renderers = {
  HeaderField: () => (
    <HeaderField
      title={HeaderField.title}
      description={HeaderField.description}
    />
  ),
  ExplanationField: () => (
    <ExplanationField
      title={ExplanationField.title}
      description={ExplanationField.description}
    />
  ),
  InputField: () => (
    <InputField
      title={InputField.title}
      placeholder={InputField.placeholder}
      description={InputField.description}
    />
  ),
  DynamicInputField: () => (
    <DynamicInputField
      title={DynamicInputField.title}
      placeholder={DynamicInputField.placeholder}
      description={DynamicInputField.description}
    />
  ),
  TextareaField: () => {
    <TextareaField
      title={TextareaField.title}
      placeholder={TextareaField.placeholder}
      description={TextareaField.description}
    />;
  },
  NumberField: () => (
    <NumberField
      title={NumberField.title}
      placeholder={NumberField.placeholder}
      description={NumberField.description}
    />
  ),
  EmailField: () => (
    <EmailField
      title={EmailField.title}
      placeholder={EmailField.placeholder}
      description={EmailField.description}
    />
  ),
  PhoneField: () => (
    <PhoneField
      title={PhoneField.title}
      placeholder={PhoneField.placeholder}
      description={PhoneField.description}
    />
  ),

  DataField: () => (
    <DataField
      title={DataField.title}
      placeholder={DataField.placeholder}
      description={DataField.description}
    />
  ),
  TimeField: () => (
    <TimeField
      title={TimeField.title}
      placeholder={TimeField.placeholder}
      description={TimeField.description}
    />
  ),
  DateField: () => (
    <DateField
      title={DateField.title}
      placeholder={DateField.placeholder}
      description={DateField.description}
    />
  ),
  PhotoField: () => (
    <PhotoField
      title={PhotoField.title}
      placeholder={PhotoField.placeholder}
      description={PhotoField.description}
    />
  ),
  VideoField: () => (
    <VideoField
      title={VideoField.title}
      placeholder={VideoField.placeholder}
      description={VideoField.description}
    />
  ),
  QRField: () => (
    <QRField
      title={QRField.title}
      placeholder={QRField.placeholder}
      description={QRField.description}
    />
  ),
  MultiSelectField: () => (
    <MultiSelectField
      title={MultiSelectField.title}
      placeholder={MultiSelectField.placeholder}
      description={MultiSelectField.description}
    />
  ),
  SingleSelectField: () => (
    <SingleSelectField
      title={SingleSelectField.title}
      placeholder={SingleSelectField.placeholder}
      description={SingleSelectField.description}
    />
  ),
  /*
  ConstantField: () => (
    <ConstantField
      title={ConstantField.title}
      placeholder={ConstantField.placeholder}
      description={ConstantField.description}
    />
  ),
  */
  /*
  AutoGenerateField: () => (
    <AutoGenerateField
      title={AutoGenerateField.title}
      placeholder={AutoGenerateField.placeholder}
      description={AutoGenerateField.description}
    />
  ),
  */
  ServiceUrlField: () => (
    <ServiceUrlField
      title={ServiceUrlField.title}
      placeholder={ServiceUrlField.placeholder}
      description={ServiceUrlField.description}
    />
  ),
  ProperGroupField: () => (
    <ProperGroupField
      title={ProperGroupField.title}
      placeholder={ProperGroupField.placeholder}
      description={ProperGroupField.description}
    />
  ),
};

export default ProperItems;
