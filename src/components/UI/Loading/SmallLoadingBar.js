import React from "react";
import ReactLoading from "react-loading";

const SmallLoadingBar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        widows: "100%",
        height: "100%",
        marginTop: "20%",
      }}
    >
      <div style={{ width: 100, height: 50, zIndex: 100 }}>
        <ReactLoading
          type="spin"
          color="#EF4136"
          height={"50%"}
          width={"50%"}
        />
      </div>
    </div>
  );
};

export default SmallLoadingBar;
