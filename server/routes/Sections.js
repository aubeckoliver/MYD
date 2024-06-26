const express = require("express");
const router = express.Router();
const { Sections } = require("../models");
const { Subjects } = require("../models");
const { SubjectEvents } = require("../models");
const { Op } = require("sequelize");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const sections = await Sections.findAll({});
  res.json(sections);
});

router.get("/defaultsections", validateToken, async (req, res) => {
  const subject = await Subjects.findOne();
  const subjectEvents = await SubjectEvents.findOne();
  if (subject != null) {
    const listOfSections = await Sections.findAll({
      where: {
        [Op.and]: [
          { SubjectId: subject.id },
          { EventId: subjectEvents.EventId },
        ],
      },
    });
    res.json(listOfSections);
  } else {
    res.json("No Projects yet!");
  }
});

router.post("/new", validateToken, async (req, res) => {
  const section = req.body;
  s = await Sections.create(section);
  res.json(s);
});

router.post("/byeventid", validateToken, async (req, res) => {
  const id = req.body.id;
  const sections = await Sections.findAll({
    where: {
      EventId: id,
    },
  });
  res.json(sections);
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await Sections.destroy({
    where: {
      id: id,
    },
  });
  res.json("Deleted!");
});

module.exports = router;
