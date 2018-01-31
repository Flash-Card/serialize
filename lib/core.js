
function accessor(serializer, getter, data, V, I = 0) {
  return serializer[V](getter(data, V, I), data, I);
}

module.exports.src = function (serializer, iterator, getter, setter, def = {}) {
  const cAccessor = (data, V, I) => accessor(serializer, getter, data, V, I);
  return (data) => {
    return iterator(data)
      .reduce((A, V, I) => {
        if (typeof serializer[V] === 'function') {
          return setter(A, cAccessor(data, V, I));
        }
        return A;
      }, def);
  };
}

module.exports.dst = function (serializer, getter, setter, def = {}) {
  const iterator = Object.keys(serializer);
  const cAccessor = (data, V) => accessor(serializer, getter, data, V);
  return (data) => iterator.reduce((A, V) => {
    const res = cAccessor(data, V);
    if (Array.isArray(res) && res[1] !== void 0) {
      return setter(A, res);
    }
    return A;
  }, def);
}

module.exports.dstExist = function (serializer, getter, setter, exist, def = {}) {
  const iterator = Object.keys(serializer);
  const cAccessor = (data, V) => accessor(serializer, getter, data, V);
  return (data) => iterator.reduce((A, V) => {
    const ccAccessor = (V) => cAccessor(data, V);
    if (exist(data, V)) {
      return setter(A, ccAccessor(V));
    }
    return A;
  }, def);
}

module.exports.create = function (list) {
  const fn = V => ({ [V]: x => [V, x] });
  return list.reduce((A, V) => Object.assign({}, A, fn(V)), {});
}
