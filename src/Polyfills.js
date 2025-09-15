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

