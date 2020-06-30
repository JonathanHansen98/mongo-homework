const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Exercise = mongoose.model("Exercise", ExerciseSchema)

module.exports = [Exercise,ExerciseSchema]
