import React from "react";

const Generators = () => {
  let x = 1;
  function* foo() {
    x++;
    yield x;
    console.log(x);
  }

  function* foo2() {
    var b = yield;
    return b;
  }

  function* foo2() {
    try {
      var b = 1;
      while (true) {
        b++;
        yield b;
      }
    } finally {
      return 1;
    }
  }

  let gen = foo2();
  console.log(gen.next());
  console.log(gen.next());
  console.log(gen.return());

  return <div>generators</div>;
};

export default Generators;
