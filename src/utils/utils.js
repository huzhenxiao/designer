export function deepCopy(target) {
  if (typeof target == "object") {
    const result = Array.isArray(target) ? [] : {};
    for (const key in target) {
      if (typeof target[key] == "object") {
        result[key] = deepCopy(target[key]);
      } else {
        result[key] = target[key];
      }
    }
    return result;
  }
  return target;
}

export function $(selector) {
  return document.querySelector(selector);
}

export function throttle(fn, delay) {
  let pre = Date.now();
  return (...args) => {
    const now = Date.now();
    if (now - pre >= delay) {
      fn.apply(this, args);
      pre = Date.now();
    }
  };
}
