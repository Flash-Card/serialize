module.exports.has = function (map, key) {
  return map.has(key);
};

module.exports.setter = function (map, tapl) {
  return map.set(tapl[0], tapl[1]);
};

module.exports.getter = function (map, key) {
  return map.get(key);
};

module.exports.iterate = function (map) {
  return map.keySeq().toList();
};
