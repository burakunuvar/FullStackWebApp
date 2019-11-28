//jshint esversion:6
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get("/", (req, res) => {
  // console.log(__dirname) ;
  res.render("landing");
});


// ======== AUTH ROUTES START HERE  ==========

//REGISTER
router.get("/register", function(req, res) {
 res.render("register");
});

router.post("/register", function(req, res) {
 const newUser= new User({
   username: req.body.username
 });
 User.register(newUser, req.body.password, function(err, user) {
   if (err) {
     console.log(err);
     req.flash("error", err.message )
     res.redirect("/register");
   }else{
     passport.authenticate('local')(req, res, function() {
      req.flash("success", "welcome " + user.username  )
       res.redirect('/movies');
     });
   }
 });
});

//LOGIN


router.get("/login",function(req,res){
    console.log("request to login/ ") ;
    res.render("login");
    // res.render("login",{message:req.flash("error")});
});

router.post("/login", passport.authenticate("local", {
        successRedirect: "/movies",
        failureRedirect: "/login",
        failureFlash: true ,
    }) ,function(req, res){
});

// router.post("/login", function(req, res) {
//   const user = new User({
//     username: req.body.username,
//     password: req.body.passport
//   });
//   req.login(user, function(err) {
//     if (err) {
//       console.log(err);
//       console.log("LOGIN FAILED");
//     }else{
//       passport.authenticate('local')(req, res, function() {
//         console.log("LOGIN SUCCESS");
//         res.redirect('/movies');
//       });
//     }
//   });
// });

//LOGOUT

router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","Logged you out! ");
   res.redirect("/");
});

// ======== AUTH ROUTES END HERE ==========



module.exports = router ;
