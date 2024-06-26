const express = require("express");
const router = express.Router();
const { SubjectEvents } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfSubjectEvents = await SubjectEvents.findAll({});
  res.json({ listOfSubjectEvents: listOfSubjectEvents });
});

module.exports = router;
