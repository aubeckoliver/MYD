const express = require("express");
const router = express.Router();
const { Muscles } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfMuscles = await Muscles.findAll();
  res.json({ listOfMuscles: listOfMuscles });
});

router.post("/new", validateToken, async (req, res) => {
  const muscle = req.body;
  const Muscle = await Muscles.create(muscle);
  res.json(Muscle);
});

router.put("/edit", validateToken, async (req, res) => {
  const { newName, id } = req.body;
  await Muscles.update({ name: newName }, { where: { id: id } });
  res.json(newName);
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await Muscles.destroy({
    where: {
      id: id,
    },
  });
  res.json("Deleted!");
});

module.exports = router;
