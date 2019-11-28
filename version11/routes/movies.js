//jshint esversion:6
const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const middleware = require("../middleware/middleware");


// ======== MOVIE ROUTES ARE STARTING HERE==========
//RESTAPI: 1-GET; request made to index.ejs
// router.get("/movies", (req, res) => {
router.get("/", (req, res) => {
  console.log("**** RESTAPI: 1-GET; request made to index.ejs ");
  Movie.find({},function(err,foundMovies){
    if(!err){
      res.render("movies/index", {
        renderedMovies: foundMovies
      });
    }else{
      console.log(err);
    }
  });
});

//RESTAPI: 2-GET form ; request made to newMovie.ejs
// router.get("/movies/newMovie", (req, res) => {
router.get("/newMovie",middleware.isLoggedIn, (req, res) => {
  console.log("**** RESTAPI: 2-GET form ; request made to newMovie.ejs ");
  res.render("movies/newMovie");
});

//RESTAPI: 3-POST ; request made to index.ejs
// router.post("/movies", (req, res) => {
router.post("/",middleware.isLoggedIn, (req, res) => {
console.log("**** RESTAPI: 3-POST ; request made to index.ejs ");
  var newMovie={
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    author: {
      id: req.user._id,
      username: req.user.username,
    },
  };
  // newMovie.author.id = req.user._id;
  // newMovie.author.username = req.user.username;
  Movie.create(newMovie,function(err,insertedMovie){
    if(!err){
      console.log(insertedMovie+" inserted successfully");
      res.redirect("/movies");
    }else{
      console.log(err);
    }
  });
});

//RESTAPI: 4-SHOW ; request made to show.ejs
// router.get("/movies/:id",function(req,res){
router.get("/:id",function(req,res){
  console.log("**** RESTAPI: 4-SHOW ; request made to show.ejs ");
  Movie.findById(req.params.id).populate("comments").exec(function(err,shownMovie){
    if(!err){
      res.render("movies/showMovie",{shownMovie:shownMovie});
      console.log(shownMovie);
    }else{
      console.log(err);
    }
  });
});


//RESTAPI: 5-EDIT ; request made to editMovie.ejs
// router.get("/movies/:id",function(req,res){
router.get("/:id/edit",middleware.checkMovieAuthorization, function(req,res){
  console.log("**** RESTAPI: 5-EDIT ; request made to editMovie.ejs ");
  Movie.findById(req.params.id, function(err,editedMovie){
    if(!err){
      res.render("movies/editMovie",{editedMovie:editedMovie});
      console.log(editedMovie);
    }else{
      console.log(err);
    }
  });
});

//RESTAPI: 6-POST ; request made to showMovie.ejs
// router.put("/movies/:id",function(req,res){
router.put("/:id",middleware.checkMovieAuthorization,function(req,res){
  console.log("**** RESTAPI: 6-PUT ; request made to showMovie.ejs ");
  Movie.findByIdAndUpdate(req.params.id,req.body.editedMovie,function(err,updatedMovie){
    if(!err){
      console.log(updatedMovie);
      res.redirect("/movies/" + req.params.id );
    }else {
      res.redirect("/movies");
    }
  });
});

//RESTAPI: 7-DELETE ; request made to showMovie.ejs
router.delete("/:id",middleware.checkMovieAuthorization,function(req,res){
  console.log("**** RESTAPI: 7-DELETE ; request made to showMovie.ejs ");
  Movie.findByIdAndRemove(req.params.id,function(err,deletedMovie){
    if(!err){

      res.redirect("/movies");
    }else{
      console.log(err);
    }
  });
});


// ======== MOVIE ROUTES ARE ENDING HERE==========



module.exports = router ;
