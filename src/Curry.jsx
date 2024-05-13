import React from "react";

// currying

let curry = (fn) => {
  return function curried(...args) {
    if (fn.length != args.length) {
      return curried.bind(this, ...args);
    }
    return fn(...args);
  };
};

const area = (x, y) => x * y;
const volume = (x, y, z) => x * y * z;

const curriedArea = curry(area);
const curriedVol = curry(volume);

// another currying ex with recursion

const sum = (a) => {
  // a will have ans in the end
  return (b) => {
    if (!b) {
      // end of call
      return a;
    }
    return sum(a + b);
  };
};

console.log(sum(1)(2)(3)(4)());

const Curry = () => {
  return <div>Curry</div>;
};

export default Curry;
