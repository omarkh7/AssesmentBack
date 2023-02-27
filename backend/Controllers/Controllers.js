const asyncHandler = require("express-async-handler");

const Goal = require("../Model/Model");

//@desc Get Goals
//@route GET /api/goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json({ goals });
});

//@desc Set Goal
//@route POST /api/goals
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goals = await Goal.create({
title:req.body.title,
description:req.body.description  });
  res.status(200).json({ goals });
});

//@desc Update Goals
//@route PUT /api/goals/:id
const UpdateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not Found");
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ updateGoal });
});

//@desc Delete Goals
//@route DELETE /api/goals/:id
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not Found");
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getGoals,
  setGoals,
  UpdateGoals,
  deleteGoals,
};
