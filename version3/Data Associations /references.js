// jshint esversion: 6
const mongoose = require('mongoose');
const Post = require("./models/post");
const User = require("./models/user");
mongoose.connect('mongodb://localhost:27017/associationsDBref', {
  useNewUrlParser: true
});


User.findOne({name: "Burak Unuvar"},function(err,found){
  console.log(found);
});

User.findOne({name: "Burak Unuvar"}).populate("posts").exec(function(err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });


    // var newPost2={
    //   title: "2- blogpost2 ",
    //   content:"referenced association: one to many relationship"
    // };
    // var newPost3={
    //   title: "3- blogpost3",
    //   content:"mongoose.Schema.Types.ObjectId is the only visible part in User Object"
    // };
    //
    // Post.create(newPost3,function(err, createdPost){
    //       if (err){
    //           console.log(err) ;
    //       }else {
    //           User.findOne({name: "Burak Unuvar"}, function(err, foundUser){
    //           if(err){
    //               console.log(err);
    //           } else {
    //               foundUser.posts.push(createdPost);
    //               foundUser.save(function(err, savedUser){
    //                   if(err){
    //                       console.log(err);
    //                   } else {
    //                       console.log(savedUser);
    //                   }
    //         });
    //       }
    //     });
    //   }
    // });
    //
    // var newUser = new User({
    //   email: "buraku@amazon.com" ,
    //   name: "Burak Unuvar"
    // });
    //
    // User.create(newUser,function(err,newUser){
    //   if(!err){
    //     console.log(newUser);
    //   }else{
    //     console.log(err);
    //   }
    // });
    //
    // var newPost=new Post({
    //   title: "1- blogpost1 ",
    //   content:"post and user created seperately"
    // });
    //
    // Post.create(newPost,function(err,newPost){
    //   if(!err){
    //     console.log(newPost);
    //   }else{
    //     console.log(err);
    //   }
    // });
