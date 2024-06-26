const express = require("express");
const router = express.Router();
const { ProjectEvents } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfProjectEvents = await ProjectEvents.findAll({});
  res.json({ listOfProjectEvents: listOfProjectEvents });
});

module.exports = router;
