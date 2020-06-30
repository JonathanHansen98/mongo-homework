const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Exercise sub-document
const ExerciseSchema = new Schema({
  type: String,
  name: String,
  duration: Number,
  weight: Number,
  reps: Number,
  sets: Number
});

const WorkoutSchema = new Schema({
  id: Schema.Types.ObjectId,
  day: Date,
  exercises: [ExerciseSchema]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;