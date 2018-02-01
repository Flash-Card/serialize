var obj = require('../lib/obj');

it('Object setter', function () {
  var inObj = { a: 10, b: 'cat' };
  expect(obj.setter(inObj, ['dog', false])).toEqual({ a: 10, b: 'cat', dog: false });
});

it('Object has the propery', function () {
  var inObj = { a: 10, b: 'cat' };
  expect(obj.has(inObj, 'b')).toBeTruthy();
  expect(obj.has(inObj, 'cat')).toBeFalsy();
});

it('Object iterate keys', function () {
  var inObj = { a: 10, b: 'cat' };
  expect(obj.iterate(inObj)).toEqual(['a', 'b']);
});
