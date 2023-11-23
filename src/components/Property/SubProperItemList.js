import DarkButtonBorder from "../UI/Buttons/DarkButtonBorder";
import "./SubProperItemList.css";
import SubProperItem from "./SubProperItem";
import AddButtonBorder from "../UI/Buttons/AddButtonBorder";

function SubProperItemList({
  values,
  openFormForSelectedValue,
  selectedProper,
  t,
}) {
  return (
    <>
      <h3>{t("Sub Propers")}</h3>
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
          text={t("View Sub Propers")}
          onClick={() => openFormForSelectedValue(selectedProper)}
        />
      </div>
    </>
  );
}

export default SubProperItemList;
