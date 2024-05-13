import React, { useState } from "react";

const Loader = () => {
  const [loaderVal, setLoader] = useState(0);
  const [timer, setTimer] = useState(0);
  const handleTimer = () => {
    setLoader(0);
    setTimer(0);
    const completionTime = 50;
    let loaderId = setInterval(() => {
      setLoader((prev) => {
        if (prev === 100) {
          clearInterval(loaderId);
          return prev;
        } else {
          return prev + 1;
        }
      });
    }, completionTime);

    let timerId = setInterval(() => {
      setTimer((prev) => {
        if (prev === 5) {
          clearInterval(timerId);
          return prev;
        } else {
          return prev + 1;
        }
      });
    }, 1000);
  };
  return (
    <div
      style={{
        width: "50vh",
        height: "50vh",
        background: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "50%",
          background: "#2c2c2c",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          color: "white",
        }}
      >
        <div> {`${loaderVal} %`}</div>
        <div> {`${timer}`}</div>
      </div>
      <button onClick={() => handleTimer()}>Start</button>
    </div>
  );
};

export default Loader;
