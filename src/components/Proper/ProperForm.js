import BlueButton from "../UI/Buttons/BlueButton";
import GreyButton from "../UI/Buttons/GreyButton";
import { AiOutlineTablet } from "react-icons/ai";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { SlScreenDesktop } from "react-icons/sl";
import "./ProperForm.css";
import InputField from "../UI/Propers/InputField";
import NumberField from "../UI/Propers/NumberField";
import EmailField from "../UI/Propers/EmailField";
import PhoneField from "../UI/Propers/PhoneField";
import DataField from "../UI/Propers/DataField";
import TimeField from "../UI/Propers/TimeField";
import PhotoField from "../UI/Propers/PhotoField";
import VideoField from "../UI/Propers/VideoField";
import QRField from "../UI/Propers/QRField";
import OCRField from "../UI/Propers/OCRField";
import MultiSelectField from "../UI/Propers/MultiSelectField";
import SingleSelectField from "../UI/Propers/SingleSelectField";
import ProperGroupField from "../UI/Propers/ProperGroupField";
import ServiceUrlField from "../UI/Propers/ServiceUrlField";
import HeaderField from "../UI/Propers/HeaderField";

function ProperForm() {
  return (
    <div className="proper-form-container">
      <div className="proper-header-container">
        <h3>CREATE PROPERS</h3>
        <div className="proper-preview-container">
          <div>
            <HiOutlineDevicePhoneMobile className="proper-preview-icon" />
            <AiOutlineTablet className="proper-preview-icon" />
            <SlScreenDesktop className="proper-preview-icon" style={{}} />
          </div>
        </div>
      </div>
      <div className="proper-form-divider" />
      <div className="proper-form-area">
        {/*
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          
          <BsArrowsMove size={40} color="#EF4136" />
          <div style={{ marginLeft: "20px", fontSize: "18px" }}>
            You can create your propers by dragging them from the toolbar menu.
          </div>
        </div>
        */}
        <HeaderField />
        <InputField
          placeholder="Please enter placeholder Exm (Please enter first name)"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />
        <NumberField
          placeholder="Please enter placeholder Exm (Please enter your age)"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />
        <EmailField
          placeholder="Please enter placeholder Exm (Please enter your email address)"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />
        <PhoneField
          placeholder="Please enter placeholder Exm (Please enter your email address)"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />
        <DataField
          placeholder="Select a file"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />
        <TimeField
          placeholder="Please enter time"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />
        <PhotoField
          placeholder="Select a image file"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />
        <VideoField
          placeholder="Select a video file"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />

        <QRField
          placeholder="Select a image file"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />
        <OCRField
          placeholder="Select a image file"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />
        <MultiSelectField
          placeholder="Select a option"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />
        <SingleSelectField
          placeholder="Select a option"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />
        <ProperGroupField
          placeholder="Select a option"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />
        <ServiceUrlField
          placeholder="Service url"
          title="Please enter proper name"
          description="Please enter proper description (optional)"
        />
      </div>
      <div className="proper-form-divider" />
      <div className="proper-form-button-container">
        <BlueButton text="Create Propers" />
        <GreyButton text="Clear Propers" />
      </div>
    </div>
  );
}

export default ProperForm;
