const { validateBug } = require('../../utils/validators');

test('returns false if title or description is missing', () => {
  expect(validateBug('', 'desc')).toBe(false);
  expect(validateBug('title', '')).toBe(false);
});

test('returns true if title and description exist', () => {
  expect(validateBug('Bug Title', 'Bug description')).toBe(true);
});
