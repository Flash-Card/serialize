'use strict';

var dstSerialize = require('./lib/core').dst;
var dstExistSerialize = require('./lib/core').dstExist;
var srcSerialize = require('./lib/core').src;

var objGetter = require('./lib/obj').getter;
var objSetter = require('./lib/obj').setter;
var objHas = require('./lib/obj').has;

var imGetter = require('./lib/im').getter;
var imSetter = require('./lib/im').setter;
var imHas = require('./lib/im').has;

module.exports.dstObjToObjSerialize = function (serializer) {
  return dstSerialize(serializer, objGetter, objSetter);
};

module.exports.dstExObjToObjSerialize = function (serializer) {
  return dstExistSerialize(serializer, objGetter, objSetter, objHas);
};

module.exports.srcArrToMapSerialize = function (serializer, emptyMap) {
  var iter = function (l) {
    return l.map(function () { return 'id'; });
  };
  var key = function (_, k) {
    return k;
  };
  var iterate = typeof arguments[2] !== 'function' ? iter : arguments[2];
  return srcSerialize(serializer, iterate, key, imSetter, emptyMap);
};

module.exports.dstImToObjSerialize = function (serializer) {
  return dstSerialize(serializer, imGetter, objSetter);
};

module.exports.dstExImToObjSerialize = function (serializer) {
  return dstExistSerialize(serializer, imGetter, objSetter, imHas);
};

module.exports.dstObjToImSerialize = function (serializer, emptyMap) {
  return dstSerialize(serializer, objGetter, imSetter, emptyMap);
};
