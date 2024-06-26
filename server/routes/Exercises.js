const express = require("express");
const router = express.Router();
const { Exercises } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfExercises = await Exercises.findAll();
  res.json({ listOfExercises: listOfExercises });
});

router.post("/new", validateToken, async (req, res) => {
  const exercise = req.body;
  const Exercise = await Exercises.create(exercise);
  res.json(Exercise);
});

router.put("/editname", validateToken, async (req, res) => {
  const { newName, id } = req.body;
  await Exercises.update({ name: newName }, { where: { id: id } });
  res.json(newName);
});

router.put("/editsets", validateToken, async (req, res) => {
  const { newSets, id } = req.body;
  await Exercises.update({ sets: newSets }, { where: { id: id } });
  res.json(newSets);
});

router.put("/editreps", validateToken, async (req, res) => {
  const { newReps, id } = req.body;
  await Exercises.update({ name: newReps }, { where: { id: id } });
  res.json(newReps);
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await Exercises.destroy({
    where: {
      id: id,
    },
  });
  res.json("Deleted!");
});

module.exports = router;
