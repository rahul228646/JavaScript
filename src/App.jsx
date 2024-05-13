import { useState } from "react";
import "./App.css";
import Generators from "./Generators";
import Thunk from "./Thunk";
import Curry from "./Curry";
import Context from "./Context";

// let printName = function(args, args2) {

//   console.log(this.first + " " + this.last,  args, args2)
// }

// Function.prototype.myBind = function (obj, ...args) {

//   let func = this;
//   return function (...args2) {
//     func.apply(obj, [...args, ...args2]);
//   };
// };

// printName.myBind(name, "I am 24 years old", "hiii")(", I live in noida")

// console.log(curriedArea(2)(3), curriedVol(2)(3)(4));

function App() {
  let name = {
    first: "Rahul",
    last: "Kaushik",
  };

  Object.setPrototypeOf(name, { b: "hi" });

  for (let key of Object.values(name)) {
    console.log(key);
  }
  var a = 40;
  {
    var a = 10;
  }

  console.log(typeof Object );

  return <Context />;
}

export default App;
