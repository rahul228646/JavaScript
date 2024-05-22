import React from "react";

const This = () => {
  const obj = {
    name: "rahul",
  };

  function foo(...args) {
    console.log(this.name, ...args);
  }

  function myBind(obj, ...args) {
    let func = this;
    return function (...args2) {
      func.apply(obj, [...args, ...args2]);
    };
  }

  Function.prototype.myBind = myBind;

  foo.call(obj, "kaushik");
  foo.apply(obj, ["kaushik", ",", "I am 24 years old"]);
  foo.bind(obj, "kaushik")(",", "I am 24 years old");
  foo.myBind(obj, "kaushik")(",", "I am 24 years old");

  return <div>This</div>;
};

export default This;
