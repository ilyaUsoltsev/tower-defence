export const throttle = (func) => {
  const timeout = 1000;
  let firstRun = true;
  let running = false;
  return function () {
    if (firstRun) {
      firstRun = false;
      func();
    } else if (!running) {
      running = true;
      setTimeout(() => {
        func();
        running = false;
      }, timeout);
    }
  };
};
