const express = require("express");
const app = express();
const { Restaurant, Menu, Item } = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:
app.use(express.json());
app.use(express.urlencoded());

app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll({
    include: Menu,
    include: [{ model: Menu, include: [{ model: Item }] }],
  });
  res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findByPk(id);
  res.json(restaurant);
});

app.post("/restaurants", async (req, res) => {
  const { name, location, cuisine } = req.body;
  const restaurant = await Restaurant.create({ name, location, cuisine });
  res.json(restaurant);
});

app.put("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const { name, location, cuisine } = req.body;
  const restaurant = await Restaurant.findByPk(id);
  await restaurant.update({ name, location, cuisine });
  res.json(restaurant);
});

app.delete("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findByPk(id);
  await restaurant.destroy();
  res.json(restaurant);
});

module.exports = app;
