const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require('dotenv').config()

// Variable to be sent to Frontend with Database status
let databaseConnection = "Waiting for Database response...";

router.get("/", function(req, res, next) {
    res.send(databaseConnection);
});

const uri = process.env.MONGO_URI

// Connecting to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    databaseConnection = "Connected to Database";
  })
  .catch(err => {
    console.log('yooo MongoDB connection error:', err);
    databaseConnection = "Error connecting to Database";
  });

module.exports = router;
