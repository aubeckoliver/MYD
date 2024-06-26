const express = require("express");
const router = express.Router();
const { Events } = require("../models");
const { Projects } = require("../models");
const { Workouts } = require("../models");
const { Subjects } = require("../models");
const { Shopping } = require("../models");
const { ProjectEvents } = require("../models");
const { WorkoutEvents } = require("../models");
const { SubjectEvents } = require("../models");
const { ShoppingEvents } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const id = req.user.id;
  const listOfEvents = await Events.findAll({
    where: {
      UserId: id,
    },
  });
  res.json({ listOfEvents: listOfEvents });
});

router.post("/new", validateToken, async (req, res) => {
  const event = req.body.event;
  const parameter = req.body.parameter;
  const e = await Events.create(event);

  if (event.type === "Work") {
    parameter.EventId = e.id;
    const oldProject = await Projects.findOne({
      where: {
        name: parameter.name,
      },
    });

    if (oldProject === null) {
      const project = await Projects.create(parameter);
      ProjectEvents.create({ EventId: e.id, ProjectId: project.id });
    } else {
      ProjectEvents.create({ EventId: e.id, ProjectId: oldProject.id });
    }
  } else if (event.type === "Study") {
    parameter.EventId = e.id;
    const oldSubject = await Subjects.findOne({
      where: {
        name: parameter.name,
      },
    });

    if (oldSubject === null) {
      const subject = await Subjects.create(parameter);
      SubjectEvents.create({ EventId: e.id, SubjectId: subject.id });
    } else {
      SubjectEvents.create({ EventId: e.id, SubjectId: oldSubject.id });
    }
  } else if (event.type === "Shopping") {
    const shopping = await Shopping.findOne({
      where: {
        name: parameter.name,
      },
    });
    ShoppingEvents.create({ EventId: e.id, ShoppingId: shopping.id });
  } else {
    const workout = await Workouts.findOne({
      where: {
        name: parameter.name,
      },
    });
    WorkoutEvents.create({ EventId: e.id, WorkoutId: workout.id });
  }

  res.json(event);
});

router.post("/byprojectid",validateToken, async (req, res) => {
  const id = req.body.id;

  const projectEvents = await ProjectEvents.findAll({
    where: {
      ProjectId: id,
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

  res.json({ listOfEvents: listOfEvents });
});

router.post("/bysubjectid", validateToken, async (req, res) => {
  const id = req.body.id;

  const subjectEvents = await SubjectEvents.findAll({
    where: {
      SubjectId: id,
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

  res.json({ listOfEvents: listOfEvents });
});

module.exports = router;
