const express = require("express");
const router = express.Router();
const { Items } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfItems = await Items.findAll();
  res.json({ listOfItems: listOfItems });
});

router.post("/new", validateToken, async (req, res) => {
  const item = req.body;
  const Item = await Items.create(item);
  res.json(Item);
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await Items.destroy({
    where: {
      id: id,
    },
  });
  res.json("Deleted!");
});

module.exports = router;
