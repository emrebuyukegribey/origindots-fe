import React, { useState } from "react";
import "./ProperToolBox.css";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { withTranslation } from "react-i18next";
import ProperItem from "./ProperItem";
import ProperItems from "./ProperItems";
import { useEffect } from "react";

function ProperToolBox(props) {
  const openingProperty = localStorage.getItem("openingProperty");
  /*
  const [isOpenProcessbar, setOpenProcessBar] = useState(
    openingProperty ? true : false
  );
  */

  const toggleProcessBar = () => {
    props.setOpenProcessBar(props.openProcessBar === true ? false : true);
  };

  useEffect(() => {
    localStorage.removeItem("openingProperty");
  }, []);

  return (
    <div
      className={
        props.openProcessBar ? "pb-opened-container" : "pb-closed-container"
      }
    >
      {console.log("props.openProcessBar : ", props.openProcessBar)}
      {!props.openProcessBar ? (
        <div
          className="pb-open-button-container"
          onClick={() => toggleProcessBar()}
        >
          <div className="pb-open-button-text">{props.t("Add Property")}</div>
          {/*<AiOutlinePlus size={30} color="#fff" />*/}
        </div>
      ) : (
        <div>
          <div className="pb-close-button-container">
            <div className="pb-close-button-container-text">
              {props.t("Proper List")}
            </div>
            <div className="pb-close-button-icon-container">
              <AiOutlineClose
                size={17}
                onClick={() => toggleProcessBar(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div>
            {ProperItems.map((proper) => (
              <ProperItem
                proper={proper}
                addProper={props.addProper}
                key={proper.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const ProperToolBoxTranslation = withTranslation()(ProperToolBox);
export default ProperToolBoxTranslation;
