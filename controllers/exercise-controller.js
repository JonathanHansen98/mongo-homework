const express = require("express");
const Router = express.Router();
const path = require('path');

const db = require('../models');
const mongoose = require("mongoose");

Router.get('/exercise', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'))
});

module.exports = Router;

