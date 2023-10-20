import React from "react";
import ReactLoading from "react-loading";

const LoadingBar = () => {
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
      <div style={{ width: 200, height: 200 }}>
        <ReactLoading
          type="bubbles"
          color="#EF4136"
          height={"50%"}
          width={"50%"}
        />
      </div>
    </div>
  );
};

export default LoadingBar;
