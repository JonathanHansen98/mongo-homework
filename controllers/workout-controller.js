const express = require("express");
const Router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

Router.get("/api/workouts", async (req, res) => {
  try {
    const data = await (await db.Workout.find({}).populate('Exercise'));
    data.forEach(i => {
      console.log(i);
    })
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}).post("/api/workouts", async (req, res) => {
  try {
    const data = await db.Workout.insert(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
})

module.exports = Router;
