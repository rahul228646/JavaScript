// TODO : Object Flat

function flattenObject(obj, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      // Recurse into nested plain objects
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

const nested = {
  user: {
    name: 'Alice',
    address: { city: 'Paris', zip: 75000 },
  },
  active: true,
};

const flat = flattenObject(nested);
console.log(flat);
/*
{
  'user.name': 'Alice',
  'user.address.city': 'Paris',
  'user.address.zip': 75000,
  'active': true
}
*/

function flattenObjectWithArray(obj, prefix = '', result = {}) {
  if (obj === null || typeof obj !== 'object') {
    // primitive or null
    result[prefix] = obj;
    return result;
  }

  const isArray = Array.isArray(obj);
  const entries = isArray ? obj.entries() : Object.entries(obj);

  for (const [key, value] of entries) {
    // For arrays, key is the index (a number); for objects, it's a string
    const newKey = prefix
      ? `${prefix}.${isArray ? key : key}`
      : String(key);

    if (value !== null && typeof value === 'object') {
      flattenObjectWithArray(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

const nested2 = {
  user: {
    name: 'Alice',
    hobbies: ['chess', { sport: 'tennis' }]
  },
  tags: ['a', 'b'],
};

console.log(flattenObject(nested2));
/*
{
  'user.name': 'Alice',
  'user.hobbies.0': 'chess',
  'user.hobbies.1.sport': 'tennis',
  'tags.0': 'a',
  'tags.1': 'b'
}
*/


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

Function.prototype.customApply = function (context, args = []) {
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



// promises ------------------------------------------------------>

// promise all
function task(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

function myPromiseAll(taskList) {
  const results = [];
  let promisesCompleted = 0;
  return new Promise((resolve, reject) => {
    taskList.forEach((promise, index) => {
      promise
        .then((val) => {
          results[index] = val;
          promisesCompleted += 1;
          if (promisesCompleted === taskList.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

const taskList = [task(1000), task(5000), task(3000)];

myPromiseAll(taskList)
  .then((results) => {
    console.log("got results", results);
  })
  .catch(console.error);


// promice race 
Promise.race = function (iterable) {
  return new Promise((resolve, reject) => {
    if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
      return reject(
        new TypeError('Promise.race accepts an iterable')
      );
    }

    for (const p of iterable) {
      // Convert any value into a promise first
      Promise.resolve(p).then(resolve, reject);
    }
  });
};

// promice any
 Promise.any = function (iterable) {
    return new Promise((resolve, reject) => {
      // Validate input is iterable
      if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
        return reject(new TypeError('Promise.any accepts an iterable'));
      }

      const errors = [];
      let pendingCount = 0;
      let hasItem = false;

      for (const p of iterable) {
        hasItem = true;
        pendingCount++;

        Promise.resolve(p).then(
          value => {
            // As soon as one promise fulfills, resolve overall promise
            resolve(value);
          },
          err => {
            errors.push(err);
            pendingCount--;
            // If all promises rejected, reject with AggregateError
            if (pendingCount === 0) {
              reject(new AggregateError(errors, 'All promises were rejected'));
            }
          }
        );
      }

      // If iterable was empty, reject immediately (per spec)
      if (!hasItem) {
        reject(new AggregateError([], 'All promises were rejected'));
      }
    });
  };
//   AggregateError is a built-in JavaScript error type that represents multiple errors bundled together.
// It was introduced in ES2021 (ECMAScript 2021) and is most often seen when using Promise.any.


// Promise all settled
Promise.allSettled = function (iterable) {
    return new Promise((resolve, reject) => {
      // Check that input is iterable
      if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
        return reject(
          new TypeError('Promise.allSettled accepts an iterable')
        );
      }

      const results = [];
      let remaining = 0;
      let index = 0;

      for (const p of iterable) {
        const currentIndex = index++;
        remaining++;

        // Ensure p is a promise
        Promise.resolve(p).then(
          value => {
            results[currentIndex] = { status: 'fulfilled', value };
            if (--remaining === 0) resolve(results);
          },
          reason => {
            results[currentIndex] = { status: 'rejected', reason };
            if (--remaining === 0) resolve(results);
          }
        );
      }

      // If iterable is empty, resolve immediately
      if (index === 0) resolve([]);
    });
  };