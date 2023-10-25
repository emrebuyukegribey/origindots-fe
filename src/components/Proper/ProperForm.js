import BlueButton from "../UI/Buttons/BlueButton";
import GreyButton from "../UI/Buttons/GreyButton";
import { AiOutlineTablet } from "react-icons/ai";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { SlScreenDesktop } from "react-icons/sl";
import "./ProperForm.css";
import { BsArrowsMove } from "react-icons/bs";
import { useSortable } from "@dnd-kit/sortable";
import { ProperFormItemRenderer } from "../ProperToolBox/ProperItems";

function getRenderer(proper) {
  return ProperFormItemRenderer(proper);
}

export function ProperFormItem(props) {
  const { proper, overlay, ...rest } = props;
  const { type } = proper;

  const Component = getRenderer(proper);

  let className = "proper-form-item";
  if (overlay) {
    className += " overlay";
  }

  return <div className="className">{Component}</div>;
}

function SortableField(props) {
  const { id, index, proper } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        index,
        id,
        proper,
      },
    });

  const style = {
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ProperFormItem proper={proper} />
    </div>
  );
}

function ProperForm(props) {
  const { properList } = props;
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
        {properList.length <= 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BsArrowsMove size={40} color="#EF4136" />
            <div style={{ marginLeft: "20px", fontSize: "18px" }}>
              You can create your propers by dragging them from the toolbar
              menu.
            </div>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            {properList.map((proper, i) => {
              return (
                <SortableField
                  proper={proper}
                  key={proper.id}
                  id={proper.id}
                  index={i}
                />
              );
            })}
          </div>
        )}
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
