const express = require("express"); 
const exerciseController = require('./controllers/exercise-controller')
const statsController = require('./controllers/stats-controller');
const workoutController = require('./controllers/workout-controller')

const mongoose = require("mongoose");
const db = require('./models');



const app = express();
const PORT = process.env.PORT || 8080;


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true });


app.use(exerciseController);
app.use(statsController);
app.use(workoutController);
// Starting the server, syncing our models ------------------------------------/
const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:8080/ in your browser.`);
  });
};

startServer();