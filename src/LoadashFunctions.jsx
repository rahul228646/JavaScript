import React from "react";

const chunk = (input, size) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};

console.log(chunk(["a", "b", "c", "d"], 2));

function deepCopy(param) {
  if (param === null) {
    return param;
  } else if (typeof param === undefined) {
    return param;
  } else if (typeof param === "string") {
    return param;
  } else if (typeof param === "number") {
    return param;
  } else if (typeof param === "boolean") {
    return param;
  } else if (typeof param === "symbol") {
    return param;
  } else if (typeof param === "bigint") {
    return param;
  } else if (Array.isArray(param)) {
    return param.map((val) => deepCopy(val));
  } else if (typeof param === "object") {
    const newObj = {};
    Object.keys(param).forEach((key) => {
      const val = deepCopy(param[key]);
      newObj[key] = val;
    });
    return newObj;
  } else {
    return param; // for function
  }
}

const a = {
  val: 1,
  prop: {
    val2: null,
    val3: { name: "a", condition: false, myArr: [1, 2, 3, undefined] },
  },
};

const b = deepCopy(a);

// group by
function groupBy(collection, property) {
  const ans = {};
  if (!collection || typeof collection !== "object") {
    return ans;
  }

  const isFunction = typeof property === "function";
  const isPath = typeof property === "string";

  for (let value of Object.values(collection)) {
    let curr = undefined;
    if (isFunction) {
      curr = property(value);
    } else if (isPath) {
      const path = property.split(".");
      let currentItem = value;
      for (let p of Object.values(path)) {
        if (p in currentItem) {
          currentItem = currentItem[p];
        } else {
          currentItem = undefined;
          break;
        }
      }
      curr = currentItem;
    }
    ans[curr] = ans[curr] || [];
    ans[curr].push(value);
  }
  return ans;
}

console.log(
  groupBy([{ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } }], "a.b.f.c")
);

// promises

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

const LoadashFunctions = () => {
  return <div>LoadashFunctions</div>;
};

export default LoadashFunctions;
