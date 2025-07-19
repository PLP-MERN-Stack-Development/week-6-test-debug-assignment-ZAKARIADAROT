const Bug = require('../models/Bug');
const asyncHandler = require('express-async-handler');

// @desc    Get all bugs
exports.getBugs = asyncHandler(async (req, res) => {
  const bugs = await Bug.find();
  res.status(200).json(bugs);
});

// @desc    Create new bug
exports.createBug = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new Error('Title and description are required');
  }
  const bug = await Bug.create({ title, description });
  res.status(201).json(bug);
});

// @desc    Update bug
exports.updateBug = asyncHandler(async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  if (!bug) {
    res.status(404);
    throw new Error('Bug not found');
  }
  const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedBug);
});

// @desc    Delete bug
exports.deleteBug = asyncHandler(async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  if (!bug) {
    res.status(404);
    throw new Error('Bug not found');
  }
  await bug.deleteOne();
  res.status(200).json({ message: 'Bug deleted' });
});
