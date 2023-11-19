import { useContext, MainContext } from "../../context";
import DarkButtonBorder from "../UI/Buttons/DarkButtonBorder";
import "./ProperItemList.css";
import SubProperItem from "./SubProperItem";

function ProperItemList({
  subPropers,
  openFormForSelectedValue,
  selectedProper,
}) {
  return (
    <>
      <h3>Sub Propers</h3>
      <div className="proper-item-list-divider" />
      {subPropers.map((proper) => {
        return <SubProperItem proper={proper} key={proper.id} />;
      })}
      <div className="proper-value-list-add-button">
        <DarkButtonBorder
          text={"Edit Selected Proper Group "}
          onClick={() => openFormForSelectedValue(selectedProper)}
        />
      </div>
    </>
  );
}

export default ProperItemList;
