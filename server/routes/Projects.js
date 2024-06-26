const express = require("express");
const router = express.Router();
const { Projects } = require("../models");
const { Tasks } = require("../models");
const { Events } = require("../models");
const { ProjectEvents } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

router.get("/", validateToken, async (req, res) => {
  const id = req.user.id;
  const listOfProjects = await Projects.findAll({
    where: {
      UserId: id,
    },
  });
  res.json({ listOfProjects: listOfProjects });
});

router.get("/defaultevents", validateToken, async (req, res) => {
  const project = await Projects.findOne();
  if (project != null) {
    const projectEvents = await ProjectEvents.findAll({
      where: {
        ProjectId: project.id,
      },
    });
    const eventIds = [];
    for (let i = 0; i < projectEvents.length; ++i) {
      eventIds.push(projectEvents[i].EventId);
    }
    const listOfEvents = await Events.findAll({
      where: {
        id: eventIds,
      },
    });
    res.json(listOfEvents);
  }
});

router.post("/project", validateToken, async (req, res) => {
  const { hour, day } = req.body;
  const event = await Events.findOne({
    where: {
      [Op.and]: [{ hour: hour }, { day: day }],
    },
  });
  const projectEvent = await ProjectEvents.findOne({
    where: {
      EventId: event.id,
    },
  });
  const project = await Projects.findOne({
    where: {
      id: projectEvent.ProjectId,
    },
  });
  res.json(project);
});

router.post("/new", validateToken, async (req, res) => {
  const project = req.body;
  const p = await Projects.create(project);
  res.json(p.id);
});

router.put("/edit", validateToken, async (req, res) => {
  const { newName, id } = req.body;
  await Projects.update({ name: newName }, { where: { id: id } });
  res.json(newName);
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const project = await Projects.findOne({
    where: {
      id: id,
    },
  });
  const pe = await ProjectEvents.findOne({
    where: {
      ProjectId: project.id,
    },
  });
  await Events.destroy({
    where: {
      id: pe.EventId,
    },
  });
  await Projects.destroy({
    where: {
      id: id,
    },
  });
  await Tasks.destroy({
    where: {
      id: project.id,
    },
  });
  res.json("Deleted!");
});

module.exports = router;
