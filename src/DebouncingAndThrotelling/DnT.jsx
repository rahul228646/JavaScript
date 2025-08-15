import React, { useState } from "react";

const DnT = () => {
  const [text, setText] = useState();
  function debounce(func, delay = 500) {
    let timeoutId;

    return function (...args) {
      // if (!timeoutId) { this will make sure initial call is made
      //   func(...args);
      // }
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  function throttle(func, delay = 1000) {
    let shouldWait = false;

    return (...args) => {
      if (shouldWait) return;
      func(...args);
      shouldWait = true;
      setTimeout(() => {
        shouldWait = false;
      }, delay);
    };
  }

  function throttle2(func, delay = 1000) {
    let shouldWait = false;
    let waitingArgs = null;

    const timeout = () => {
      if (waitingArgs) {
        func(...waitingArgs);
        waitingArgs = null;
        setTimeout(timeout, delay);
      } else {
        shouldWait = false;
      }
    };

    return (...args) => {
      if (shouldWait) {
        waitingArgs = args;
        return;
      }
      func(...args);
      shouldWait = true;
      setTimeout(timeout, delay);
    };
  }



  const handleSearchThrottle = throttle2((text) => {
    console.log(text);
  });

  const handleSearch = debounce((text) => {
    setText(text);
  });
  return (
    <div>
      <input onChange={(e) => handleSearchThrottle(e.target.value)} />
      <p>{text}</p>
    </div>
  );
};

export default DnT;
