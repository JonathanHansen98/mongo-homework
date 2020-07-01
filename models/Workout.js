const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Exercise sub-document
const ExerciseSchema = new Schema({
  type: String,
  name: String,
  duration: {
    type: Number,
    default: 0
  },
  weight: {
    type: Number,
    default: 0
  },
  reps: {
    type: Number,
    default: 0
  },
  sets: {
    type: Number,
    default: 0
  },
  distance : {
    type: Number,
    default: 0
  }
});

const WorkoutSchema = new Schema({
  id: Schema.Types.ObjectId,
  day: {
    type: Date,
    default: Date.now()
  },
  totalExercise: Number,
  totalDuration: Number,
  exercises: [ExerciseSchema]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;