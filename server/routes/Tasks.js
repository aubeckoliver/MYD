const express = require("express");
const router = express.Router();
const { Tasks } = require("../models");
const { Projects } = require("../models");
const { ProjectEvents } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

router.get("/", validateToken, async (req, res) => {
  const tasks = await Tasks.findAll({});
  res.json(tasks);
});

router.get("/defaulttasks", validateToken, async (req, res) => {
  const project = await Projects.findOne();
  const projectEvents = await ProjectEvents.findOne();
  if (project != null) {
    const listOfTasks = await Tasks.findAll({
      where: {
        [Op.and]: [
          { ProjectId: project.id },
          { EventId: projectEvents.EventId },
        ],
      },
    });
    res.json(listOfTasks);
  } else {
    res.json("No Projects yet!");
  }
});

router.post("/new", validateToken, async (req, res) => {
  const task = req.body;
  t = await Tasks.create(task);
  res.json(t);
});

router.post("/byeventid", validateToken, async (req, res) => {
  const id = req.body.id;
  const tasks = await Tasks.findAll({
    where: {
      EventId: id,
    },
  });
  res.json(tasks);
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await Tasks.destroy({
    where: {
      id: id,
    },
  });
  res.json("Deleted!");
});

module.exports = router;
