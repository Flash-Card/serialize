'use strict';

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

module.exports.withValue = withValue;
