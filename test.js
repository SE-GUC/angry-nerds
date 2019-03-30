const funcs = require('./fn');

test('adds 1 + 2 to be 3', () => {
  expect(funcs.add(1, 2)).toBe(3);
});
