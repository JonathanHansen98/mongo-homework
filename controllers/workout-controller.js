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
    // loop through all workouts
    data.forEach(workout => {
     // set global variable totalDuration
     let totalDuration = 0;
     let totalDistance = 0;
     // inside workout loop, loop through exercises
      workout.exercises.forEach(exercise => {
        // add the duration of each exercise to totalDuration
        totalDuration += exercise.duration
        totalDistance += exercise.distance
      })
      // set totalDuration property to each workout equal to the totalDuration
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
    // get first elements in desc order
    
  //  const data = await db.Workout.find({}).sort({day:'desc'}).limit(7);
  //  const range =[];
  //  data.forEach(workout => {
  //    range.unshift(workout)
  //  })

  // Get just last 7 elements in current order
  //  res.json(range)
  //  const range = data.slice( data.length - 7, data.length + 1)
  //  console.log( 'range' + range)
  //  res.json(range);

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
