import {
  BiHeading,
  BiPhotoAlbum,
  BiSelectMultiple,
  BiCodeCurly,
} from "react-icons/bi";
import { BsCursorText, BsDatabaseAdd, BsOpticalAudio } from "react-icons/bs";
import { GoNumber, GoMultiSelect } from "react-icons/go";
import { MdAlternateEmail, MdOutlineDateRange } from "react-icons/md";
import {
  AiOutlinePhone,
  AiOutlineVideoCameraAdd,
  AiOutlineQrcode,
  AiOutlineBorderlessTable,
} from "react-icons/ai";
import { RiAiGenerate } from "react-icons/ri";
import { IoMdQrScanner } from "react-icons/io";
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
import MultiSelectField from "../UI/Propers/MultiSelectField";
import SingleSelectField from "../UI/Propers/SingleSelectField";
import ServiceUrlField from "../UI/Propers/ServiceUrlField";
import ProperGroupField from "../UI/Propers/ProperGroupField";

const ProperItems = [
  {
    id: 1,
    icon: <BiHeading />,
    text: "Header",
    type: "HeaderField",
    title: "Header",
  },
  {
    id: 2,
    icon: <BsCursorText />,
    text: "Text Input",
    type: "InputField",
    title: "Proper Name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 3,
    icon: <GoNumber />,
    text: "Number Input",
    type: "NumberField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 4,
    icon: <MdAlternateEmail />,
    text: "Email Input",
    type: "EmailField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 5,
    icon: <AiOutlinePhone />,
    text: "Phone Input",
    type: "PhoneField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 6,
    icon: <BsDatabaseAdd />,
    text: "Data Input",
    type: "DataField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 7,
    icon: <MdOutlineDateRange />,
    text: "Time Input",
    type: "TimeField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 8,
    icon: <BiPhotoAlbum />,
    text: "Photo",
    type: "PhotoField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 9,
    icon: <AiOutlineVideoCameraAdd />,
    text: "Video",
    type: "VideoField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 10,
    icon: <AiOutlineQrcode />,
    text: "QR",
    type: "QRField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 11,
    icon: <IoMdQrScanner />,
    text: "OCR",
    type: "OCRField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 12,
    icon: <GoMultiSelect />,
    text: "Multi Select",
    type: "MultiSelectField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
  },
  {
    id: 13,
    icon: <BiSelectMultiple />,
    text: "Single Select",
    type: "SingleSelectField",
    title: "Proper name",
    placeholder: "Placeholder",
    description: "description (optional)",
    values: ["value1"],
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
  InputField: () => (
    <InputField
      title={InputField.title}
      placeholder={InputField.placeholder}
      description={InputField.description}
    />
  ),
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
