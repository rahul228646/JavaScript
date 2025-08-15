import React from "react";

/* In other words, you wrap a function definition around function call -- 
with any parameters it needs -- to defer the execution of that call, and that wrapping function is a thunk. 
When you later execute the thunk, you end up calling the original function. */

function foo(x, y) {
  return x + y;
}

function fooThunk() {
  return foo(3, 4);
}

// async thunk receives a callback

function asyncFoo(x, y, cb) {
  setTimeout(function () {
    cb(x + y);
  }, 1000);
}

function asyncFooThunk(cb) {
  asyncFoo(3, 4, cb);
}

// later

asyncFooThunk(function (sum) {
  console.log(sum); // 7
});

// thunkify utility

function thunkify(fn) {
  var args = [...arguments].slice(1); // converts agrumens array to a normal array except the first function
  return function (cb) {
    args.push(cb);
    return fn.apply(null, args);
  };
}

var fooThunk2 = thunkify(foo, 3, 4);

// later

fooThunk2(function (sum) {
  console.log(sum); // 7
});

const Thunk = () => {
  return <div>Thunk</div>;
};

export default Thunk;
