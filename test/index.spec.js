var dstObjToObjSerialize = require('../index').dstObjToObjSerialize;
var create = require('../lib/core').create;

it('Transform object based on destination params', function () {
  var serializer = {
    key: function (v) {
      return ['key', v];
    },
    count: function (_, d) {
      return ['count', d.k + 1];
    }
  };
  var inObject = {
    key: 'apple',
    k: 1,
    lastShow: '2017-01-01',
    dateAdd: '2017-01-01'
  };
  var outObject = {
    count: 2,
    key: 'apple'
  };

  expect(dstObjToObjSerialize(serializer)(inObject)).toEqual(outObject);
});

it('Create serilaize from array of propery name', function () {
  var inObject = {
    test: false,
    cat: 10,
    dog: 12,
    apple: 5
  };
  var outObject = {
    test: false,
    cat: 10
  };
  var crs = create(['test', 'cat']);
  var serializer = dstObjToObjSerialize(crs);
  expect(serializer(inObject)).toEqual(outObject);
});
