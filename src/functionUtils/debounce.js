function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle = false;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

const logDebounced = debounce((msg) => console.log("debounced:", msg), 300);
logDebounced("first");
logDebounced("second");
logDebounced("third (only this one should print)");

const logThrottled = throttle((msg) => console.log("throttled:", msg), 300);
logThrottled("call 1 (prints immediately)");
logThrottled("call 2 (ignored, too soon)");
