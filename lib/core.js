'use strict';

var helpers = require('./helpers');

function accessor (serializer, getter, data, V) {
  var I = arguments.length < 5 ? 0 : arguments[4];
  return serializer[V](getter(data, V, I), data, I);
}

module.exports.src = function (serializer, iterate, getter, setter) {
  var def = arguments.length < 5 ? {} : arguments[4];
  var cAccessor = function (data, V, I) {
    return accessor(serializer, getter, data, V, I);
  };
  return function (data) {
    return iterate(data)
      .reduce(function (A, V, I) {
        if (typeof serializer[V] === 'function') {
          return setter(A, cAccessor(data, V, I));
        }
        return A;
      }, def);
  };
};

module.exports.dst = function (serializer, getter, setter) {
  var def = arguments.length < 4 ? {} : arguments[3];
  var iterate = Object.keys(serializer);
  var cAccessor = function (data, V) {
    return accessor(serializer, getter, data, V);
  };
  return function (data) {
    return iterate.reduce(function (A, V) {
      var res = cAccessor(data, V);
      if (Array.isArray(res) && res[1] !== void 0) {
        return setter(A, res);
      }
      return A;
    }, def);
  };
};

module.exports.dstExist = function (serializer, getter, setter, exist) {
  var def = arguments.length < 5 ? {} : arguments[4];
  var iterate = Object.keys(serializer);
  var cAccessor = function (data, V) {
    return accessor(serializer, getter, data, V);
  };
  return function (data) {
    return iterate.reduce(function (A, V) {
      var ccAccessor = function (V) {
        return cAccessor(data, V);
      };
      if (exist(data, V)) {
        return setter(A, ccAccessor(V));
      }
      return A;
    }, def);
  };
};

module.exports.create = function (list) {
  function value (name) {
    return function (x) { return [name, x]; };
  }

  var reduceHandler = function (a, v) {
    return Object.defineProperty(a, v, helpers.withValue(value(v)));
  };

  return list.reduce(reduceHandler, {});
};
