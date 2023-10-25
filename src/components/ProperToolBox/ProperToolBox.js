import React, { useEffect, useState } from "react";
import "./ProperToolBox.css";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { withTranslation } from "react-i18next";
import ProperItem from "./ProperItem";
import { BiHeading } from "react-icons/bi";
import { BsCursorText } from "react-icons/bs";
import { GoNumber } from "react-icons/go";
import ProperItems from "./ProperItems";
import DraggableProperItem from "./DraggableProperItem";

function ProperToolBox(props) {
  const [isOpenProcessbar, setOpenProcessBar] = useState(false);

  return (
    <div
      className={
        isOpenProcessbar ? "pb-opened-container" : "pb-closed-container"
      }
    >
      {!isOpenProcessbar ? (
        <div
          className="pb-open-button-container"
          onClick={() => setOpenProcessBar(true)}
        >
          <div className="pb-open-button-text">{props.t("Add Property")}</div>
          <AiOutlinePlus size={30} color="#fff" />
        </div>
      ) : (
        <div>
          <div className="pb-close-button-container">
            <div className="pb-close-button-container-text">
              Özellik Listesi
            </div>
            <div className="pb-close-button-icon-container">
              <AiOutlineClose
                size={20}
                onClick={() => setOpenProcessBar(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div>
            {ProperItems.map((proper) => (
              <DraggableProperItem proper={proper} key={proper.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const ProperToolBoxTranslation = withTranslation()(ProperToolBox);
export default ProperToolBoxTranslation;
