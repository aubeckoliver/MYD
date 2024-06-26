const express = require("express");
const router = express.Router();
const { Shopping } = require("../models");
const { ShoppingEvents } = require("../models");
const { Events } = require("../models");
const { Op } = require("sequelize");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfShopping = await Shopping.findAll();
  res.json({ listOfShopping: listOfShopping });
});

router.post("/new", validateToken, async (req, res) => {
  const shopping = req.body;
  const x = await Shopping.create(shopping);
  res.json(x);
});

router.post("/id", validateToken, async (req, res) => {
  const name = req.body.name;
  const shopping = await Shopping.findAll({
    where: {
      name: name,
    },
  });
  res.json({ id: shopping.id });
});

router.put("/edit", validateToken, async (req, res) => {
  const { newName, id } = req.body;
  await Shopping.update({ name: newName }, { where: { id: id } });
  res.json(newName);
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await Shopping.destroy({
    where: {
      id: id,
    },
  });
  res.json("Deleted!");
});

router.post("/shopping", validateToken, async (req, res) => {
  const { hour, day } = req.body;
  const event = await Events.findOne({
    where: {
      [Op.and]: [{ hour: hour }, { day: day }],
    },
  });
  const shoppingEvent = await ShoppingEvents.findOne({
    where: {
      EventId: event.id,
    },
  });
  const shopping = await Shopping.findOne({
    where: {
      id: shoppingEvent.ShoppingId,
    },
  });
  res.json(shopping);
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
