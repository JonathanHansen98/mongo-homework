const express = require("express");
const Router = express.Router();
const path = require('path');

Router.get('/stats', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'))
});

module.exports = Router;

