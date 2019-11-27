const mongoose = require('mongoose');

var postSchema = {
  title: String,
  content: String,
};
var Post = mongoose.model("Post", postSchema);

module.exports = Post;
