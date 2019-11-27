// jshint esversion: 6
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/associationsDB', {
  useNewUrlParser: true
});

var postSchema = {
  title: String,
  content: String,
};
var Post = mongoose.model("Post", postSchema);

var userSchema = {
  email: String,
  name: String,
  posts: [postSchema]
};
var User = mongoose.model("User", userSchema);


User.findOne({name: "James Gordon"}, function(err, foundUser) {
  if (err) {
    console.log(err);
  } else {
    foundUser.posts.push({
      title: "adding the second post, as an object, ",
      content: "inside the posts array, which is an item of user object",
    });
    foundUser.save(function(err, savedUser) {
      if (err) {
        console.log(err);
      } else {
        console.log(savedUser);
      }
    });
  }
});
