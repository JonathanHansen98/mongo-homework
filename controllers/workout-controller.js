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
    let data = await (await db.Workout.find({}));
    data.forEach(workout => {
     let totalDuration = 0;
     let totalDistance = 0;
      workout.exercises.forEach(exercise => {
        totalDuration += exercise.duration
        totalDistance += exercise.distance
      })
      workout.totalDuration = totalDuration
      workout.totalDistnace = totalDistance
    })
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}).post("/api/workouts", async (req, res) => {
  try {
    const data = await db.Workout.create(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}).get("/api/workouts/range",async(req,res)=>{
  try {
    // get first documents in desc order
    // last 7 days in desc order should be the newest 7 days for the graphs to use
   const data = await db.Workout.find({}).sort({day:'desc'}).limit(7);

   res.json(data);

  } catch (error) {
   console.log(error);
   res.send(error);
  }
}).put("/api/workouts/:id", async(req,res)=>{
  try {
      const data = await db.Workout.findByIdAndUpdate(req.params.id, {$push: { exercises: req.body}});
      res.json(data);
  } catch (error) {
      console.log(error);
   res.send(error);
  }
})

module.exports = Router;
