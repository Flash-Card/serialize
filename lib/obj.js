'use strict';

module.exports.has = function (obj, key) {
  return (key in obj);
};

module.exports.setter = function (obj, tapl) {
  return Object.defineProperty(obj, tapl[0], {
    value: tapl[1],
    enumerable: true,
    writable: true,
    configurable: true
  });
};

module.exports.getter = function (obj, key) {
  return (obj && key in obj) ? obj[key] : undefined;
};

module.exports.iterate = function (obj) {
  return Object.keys(obj);
};
