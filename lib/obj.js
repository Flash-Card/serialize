'use strict';

var helpers = require('./helpers');

module.exports.has = function (obj, key) {
  return (key in obj);
};

module.exports.setter = function (obj, tapl) {
  return Object.defineProperty(obj, tapl[0], helpers.withValue(tapl[1]));
};

module.exports.getter = function (obj, key) {
  return (obj && key in obj) ? obj[key] : undefined;
};

module.exports.iterate = function (obj) {
  return Object.keys(obj);
};
