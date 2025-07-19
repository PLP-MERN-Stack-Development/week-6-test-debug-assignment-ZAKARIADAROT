exports.validateBug = (title, description) => {
  if (!title || !description) return false;
  return true;
};
