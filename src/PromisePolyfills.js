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