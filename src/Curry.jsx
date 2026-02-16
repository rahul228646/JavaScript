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

// console.log(curriedArea(3)(4));


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


function sum(...args1) {
    // store cumulative sum
    let total = args1.reduce((a, b) => a + b, 0);

    // inner function for chaining
    function inner(...args) {
        if (args.length === 0) {
            // no arguments → return total
            return total;
        }
        // add new args to total
        total += args.reduce((a, b) => a + b, 0);
        return inner; // return function for chaining
    }

    return inner;
}

// Usage:
console.log(sum(1)(2,3)(4,5,6)()); // 21

const Curry = () => {
  return <div>Curry</div>;
};

export default Curry;
