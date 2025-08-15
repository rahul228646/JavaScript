import { useState } from "react";
import "./App.css";
import Generators from "./Generators";
import Thunk from "./Thunk";
import Curry from "./Curry";
import Context from "./Context";
import Loader from "./loader/Loader";
import LoadashFunctions from "./LoadashFunctions";
import DnT from "./DebouncingAndThrotelling/DnT";
import "./Polyfills";

function App() {
  return (
    <>
      {/* <Context /> */}
      <DnT />
      {/* <Curry/> */}
      <Thunk />
    </>
  );
}

export default App;
