// Array Flatten ---------------------------------------------------------------------->

Array.prototype.customFlat = function flat(depth = 1) {
  const res = [];
  const array = this;
  array.forEach(function (element) {
    if (Array.isArray(element) && depth > 0) {
      res.push(...flat.call(element, depth - 1));
    } else {
      res.push(element);
    }
  });
  return res;
};

const sampleData = [1, 2, 3, 4, [5, [6, 7], 12]];

console.log(sampleData.customFlat(1));

// call ---------------------------------------------------------------------->

Function.prototype.customCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("Not a function");
  }
  context.fn = this;
  context.fn(...args);
};

// apply ---------------------------------------------------------------------->

Function.prototype.customCall = function (context, args = []) {
  if (typeof this !== "function") {
    throw new Error("Not a function");
  }

  if (Array.isArray(args)) {
    throw new Error("args is Not an array");
  }

  context.fn = this;
  context.fn(...args);
};

// Bind ---------------------------------------------------------------------->
let nameObj = {
  firstName: "Rahul",
  lastName: "Kaushik",
};

function printMyName(...args) {
  console.log(args);

  console.log(`hi my name is ${this.firstName} ${this.lastName}`);
}
const bindedFunction = printMyName.bind(nameObj);
bindedFunction();

function customBind(context, ...agrs) {
  const func = this;
  const args = agrs;
  return function (...args2) {
    func.apply(context, [...args, ...args2]);
  };
}

Function.prototype.customBind = customBind;

const customBindedFunction = printMyName.customBind(nameObj, "hi", "hello");
customBindedFunction("cool");

// Map ---------------------------------------------------------------------->
Array.prototype.customMap = function (cb) {
  const modifiedArray = [];
  for (let i = 0; i < this.length; i++) {
    modifiedArray.push(cb(this[i], i, this));
  }
  return modifiedArray;
};
// console.log([1, 2].customMap((item) => item * 10));

// Filter ---------------------------------------------------------------------->

Array.prototype.customFilter = function (cb) {
  const modifiedArray = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) modifiedArray.push(this[i]);
  }
  return modifiedArray;
};
// console.log([3, 4].customFilter((item) => item % 2 == 0));

// Reduce ---------------------------------------------------------------------->

Array.prototype.customReduce = function (cb, initialVal) {
  let accumulator = initialVal;
  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
  }
  return accumulator;
};

const memoizedFunction = (fn, context) => {
  const res = {};
  return function (...agrs) {
    let cachedArgs = JSON.stringify(agrs);
    if (!(cachedArgs in res)) {
      res[cachedArgs] = fn.call(context || this, ...agrs);
    }
    return res[cachedArgs];
  };
};

// Promise ---------------------------------------------------------------------->

function MyPromise(executor) {
  console.log("--->", this);

  let onResolve = null;
  let onReject = null;
  let isFulfilled = false;
  let isRejected = false;
  let val;

  function resolve(value) {
    isFulfilled = true;
    val = value;
    if (typeof onResolve === "function") {
      onResolve(value);
    }
  }

  function reject(error) {
    isRejected = true;
    val = error;
    if (typeof onResolve === "function") {
      onReject(error);
    }
  }

  this.then = function (cb) {
    onResolve = cb;
    if (isFulfilled) {
      onResolve(val);
    }
    return this;
  };
  this.catch = function (cb) {
    onReject = cb;
    if (isRejected) {
      onReject(val);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (err) {
    resolve(err);
  }
}

const promiseTest = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  resolve("rahul");
  // });
});

promiseTest
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
