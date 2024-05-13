import React from "react";

const Context = () => {
  let obj = {
    name: "rahul",
  };

  function foo(...args) {
    console.log(this.name + " " + args);
  }
  foo.call(obj, "kaushik", "I am 23 years old", "Hello");
  foo.apply(obj, ["kaushik", "I am 23 years old", "Hello"]);
  foo.bind(obj, "kaushik", 1)("I am 23 years old", "Hello");

  return <div>Context</div>;
};

export default Context;
