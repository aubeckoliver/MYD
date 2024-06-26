const express = require("express");
const router = express.Router();
const { Events } = require("../models");
const { Subjects } = require("../models");
const { Sections } = require("../models");
const { SubjectEvents } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

router.get("/", validateToken, async (req, res) => {
  const id = req.user.id;
  const listOfSubjects = await Subjects.findAll({
    where: {
      UserId: id,
    },
  });
  res.json({ listOfSubjects: listOfSubjects });
});

router.post("/subject", validateToken, async (req, res) => {
  const { hour, day } = req.body;
  const event = await Events.findOne({
    where: {
      [Op.and]: [{ hour: hour }, { day: day }],
    },
  });
  const subjectEvent = await SubjectEvents.findOne({
    where: {
      EventId: event.id,
    },
  });
  const subject = await Subjects.findOne({
    where: {
      id: subjectEvent.SubjectId,
    },
  });
  res.json(subject);
});

router.post("/new", validateToken, async (req, res) => {
  const subject = req.body;
  const s = await Subjects.create(subject);
  res.json(s.id);
});

router.put("/edit", validateToken, async (req, res) => {
  const { newName, id } = req.body;
  await Subjects.update({ name: newName }, { where: { id: id } });
  res.json(newName);
});

router.get("/defaultevents", validateToken, async (req, res) => {
  const subject = await Subjects.findOne();
  if (subject != null) {
    const subjectEvents = await SubjectEvents.findAll({
      where: {
        SubjectId: subject.id,
      },
    });
    const eventIds = [];
    for (let i = 0; i < subjectEvents.length; ++i) {
      eventIds.push(subjectEvents[i].EventId);
    }
    const listOfEvents = await Events.findAll({
      where: {
        id: eventIds,
      },
    });
    res.json(listOfEvents);
  }
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const subject = await Subjects.findOne({
    where: {
      id: id,
    },
  });
  const se = await SubjectEvents.findOne({
    where: {
      SubjectId: subject.id,
    },
  });
  await Events.destroy({
    where: {
      id: se.EventId,
    },
  });
  await Subjects.destroy({
    where: {
      id: id,
    },
  });
  await Sections.destroy({
    where: {
      id: subject.id,
    },
  });
  res.json("Deleted!");
});

module.exports = router;
