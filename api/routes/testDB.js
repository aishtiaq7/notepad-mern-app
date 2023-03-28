const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

const Blog = require("./blog");

let databaseConnection = "Waiting for Database response...";

// Connecting to MongoDB
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    databaseConnection = "Connected to Database";
  })
  .catch((err) => {
    console.log("yooo MongoDB connection error:", err);
    databaseConnection = "Error connecting to Database";
  });

module.exports = router;

router.get("/", function (req, res, next) {
  res.send(databaseConnection);
});


//CURD Functionalities:
router.post("/addnote", function (req, res, next) {
  const { title, content } = req.body;
  console.log("title:", title);
  console.log("content:", content);
  if (title && content) {
    const blog = new Blog({
      title: title,
      content: content,
    });
    blog
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.send("err saving data");
      });
  }
});

router.get("/allnotes", function (req, res, next) {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send("err saving data");
    });
});

router.post("/deletenote/:id", function (req, res, next) {
  const id = req.params.id
  console.log('id:',id);
  try{
    Blog.findByIdAndDelete(id)
    .then((result) => {
      console.log('delete id:', id);
      res.send('deleted id '+ id);
    })
    .catch((err) => {
      console.log(err);
      res.send("CANT find with id:" + id);
    });
  }catch (err){
    console.log(err)
  }

});
