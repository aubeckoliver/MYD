const express = require("express");
const router = express.Router();
const { Workouts } = require("../models");
const { WorkoutEvents } = require("../models");
const { Events } = require("../models");
const { Op } = require("sequelize");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfWorkouts = await Workouts.findAll();
  res.json({ listOfWorkouts: listOfWorkouts });
});

router.post("/new", validateToken, async (req, res) => {
  const workout = req.body;
  const w = await Workouts.create(workout);
  res.json(w);
});

router.post("/id", validateToken, async (req, res) => {
  const name = req.body.name;
  const workout = await Workouts.findAll({
    where: {
      name: name,
    },
  });
  res.json({ id: workout.id });
});

router.put("/edit", validateToken, async (req, res) => {
  const { newName, id } = req.body;
  await Workouts.update({ name: newName }, { where: { id: id } });
  res.json(newName);
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await Workouts.destroy({
    where: {
      id: id,
    },
  });
  res.json("Deleted!");
});

router.post("/workout", validateToken, async (req, res) => {
  const { hour, day } = req.body;
  const event = await Events.findOne({
    where: {
      [Op.and]: [{ hour: hour }, { day: day }],
    },
  });
  const workoutEvent = await WorkoutEvents.findOne({
    where: {
      EventId: event.id,
    },
  });
  const workout = await Workouts.findOne({
    where: {
      id: workoutEvent.WorkoutId,
    },
  });
  res.json(workout);
});

router.post("/deleteevent", validateToken, async (req, res) => {
  const { hour, day } = req.body;
  const event = await Events.destroy({
    where: {
      [Op.and]: [{ hour: hour }, { day: day }],
    },
  });
  res.json(event);
});

module.exports = router;
