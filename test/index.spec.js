var dstObjToObjSerialize = require('../index').dstObjToObjSerialize;

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
