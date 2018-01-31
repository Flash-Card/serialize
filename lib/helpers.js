'use strict';

module.exports.assignProperty = function (obj, key, value) {
  function withValue (value) {
    var d = withValue.d || (
      withValue.d = {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      }
    );
    d.value = value;
    return d;
  };
  Object.defineProperty(obj, key, withValue(value));
  return obj;
};
