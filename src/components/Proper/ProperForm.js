import BlueButton from "../UI/Buttons/BlueButton";
import LightButton from "../UI/Buttons/GreyButton";
import { AiOutlineTablet } from "react-icons/ai";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { SlScreenDesktop } from "react-icons/sl";
import "./ProperForm.css";
import DarkButton from "../UI/Buttons/DarkButton";
import RedButton from "../UI/Buttons/RedButton";

function ProperForm(props) {
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
      </div>
      <div className="proper-form-divider" />
      <div className="proper-form-button-container">
        <div>
          <LightButton onClick={props.previosStep} text="Previos" />
        </div>
        <div style={{ display: "flex" }}>
          <DarkButton text="Create Propers" />
          <RedButton text="Clear Propers" />
        </div>
      </div>
    </div>
  );
}

export default ProperForm;
