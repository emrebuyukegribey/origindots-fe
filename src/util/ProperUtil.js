import {
  AiOutlinePhone,
  AiOutlineQrcode,
  AiOutlineVideoCameraAdd,
} from "react-icons/ai";
import {
  BiCodeCurly,
  BiHeading,
  BiPhotoAlbum,
  BiSelectMultiple,
} from "react-icons/bi";
import { BsCursorText, BsDatabaseAdd, BsTextareaResize } from "react-icons/bs";
import { GoMultiSelect, GoNumber } from "react-icons/go";
import { IoMdQrScanner, IoMdTimer } from "react-icons/io";
import {
  MdAlternateEmail,
  MdOutlineDateRange,
  MdOutlineRadioButtonChecked,
} from "react-icons/md";

export function getIconFromProper(proper) {
  if (proper.type === "Header") {
    return <BiHeading />;
  } else if (proper.type === "InputField") {
    return <BsCursorText />;
  } else if (proper.type === "TextareaField") {
    return <BsTextareaResize />;
  } else if (proper.type === "NumberField") {
    return <GoNumber />;
  } else if (proper.type === "EmailField") {
    return <MdAlternateEmail />;
  } else if (proper.type === "PhoneField") {
    return <AiOutlinePhone />;
  } else if (proper.type === "DataField") {
    return <BsDatabaseAdd />;
  } else if (proper.type === "DateField") {
    return <MdOutlineDateRange />;
  } else if (proper.type === "TimeField") {
    return <IoMdTimer />;
  } else if (proper.type === "PhotoField") {
    return <BiPhotoAlbum />;
  } else if (proper.type === "VideoField") {
    return <AiOutlineVideoCameraAdd />;
  } else if (proper.type === "QRField") {
    return <AiOutlineQrcode />;
  } else if (proper.type === "OCRField") {
    return <IoMdQrScanner />;
  } else if (proper.type === "DropDownField") {
    return <GoMultiSelect />;
  } else if (proper.type === "SingleSelectField") {
    return <MdOutlineRadioButtonChecked />;
  } else if (proper.type === "MultiSelectField") {
    return <BiSelectMultiple />;
  } else {
    return <BiCodeCurly />;
  }
}
