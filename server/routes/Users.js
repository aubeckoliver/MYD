const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bycrypt = require("bcrypt");
const { Subjects } = require("../models");
const { SubjectEvents } = require("../models");
const { Events } = require("../models");
const { Projects } = require("../models");
const { Shopping } = require("../models");
const { ProjectEvents } = require("../models");
const { WorkoutEvents } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const { Op } = require("sequelize");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bycrypt.hash(password, 10).then(async (hash) => {
    await Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) return res.json({ error: "User Don't Exist!" });
  bycrypt.compare(password, user.password).then((match) => {
    if (!match)
      return res.json({ error: "Wrong Username And Password Combination" });
    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    return res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/getday", validateToken, async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.user.id,
    },
  });
  res.json({ dayStart: user.dayStart, dayEnd: user.dayEnd });
});

router.put("/editday",  validateToken, async (req, res) => {
  const { dayStart, dayEnd, UserId } = req.body;
  Users.update(
    { dayStart: dayStart, dayEnd: dayEnd },
    { where: { id: UserId } }
  );
  res.json(req.body);
});

router.delete("/delete", validateToken, async (req, res) => {
  await Projects.destroy({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });
  await ProjectEvents.destroy({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });
  await Events.destroy({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });
  await Subjects.destroy({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });
  await SubjectEvents.destroy({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });
  await Shopping.destroy({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });
  await WorkoutEvents.destroy({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });
  res.json("Deleted!");
});

module.exports = router;
