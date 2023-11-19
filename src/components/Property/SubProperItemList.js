import DarkButtonBorder from "../UI/Buttons/DarkButtonBorder";
import "./SubProperItemList.css";
import SubProperItem from "./SubProperItem";
import AddButtonBorder from "../UI/Buttons/AddButtonBorder";

function SubProperItemList({
  values,
  openFormForSelectedValue,
  selectedProper,
}) {
  return (
    <>
      <h3>Sub Proper Settings</h3>
      <div className="proper-item-list-divider" />

      {values && values.length > 0 && (
        <div>
          {values.map((proper) => {
            return <SubProperItem proper={proper} key={proper.id} />;
          })}
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <DarkButtonBorder
          text="Add New Proper"
          onClick={() => openFormForSelectedValue(selectedProper)}
        />
      </div>
    </>
  );
}

export default SubProperItemList;
