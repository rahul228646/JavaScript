import React from "react";
import Loader from "./loader/Loader";

const Wrapper = () => {
  return (
    <div
      style={{
        height: "80vh",
        width: "80vw",
        background: "#2c2c2c",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
    </div>
  );
};

export default Wrapper;
