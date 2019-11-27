
// PART1 : CREATE A USER AND A POST
var newUser = {
  email: "buraku@amazon.com" ,
  name: "Burak Unuvar"
};

User.create(newUser,function(err,newUser){
  if(!err){
    console.log(newUser);
  }else{
    console.log(err);
  }
});

var newPost={
  title: "aaa",
  content:"bbb"
};

Post.create(newPost,function(err,newPost){
  if(!err){
    console.log(newPost);
  }else{
    console.log(err);
  }
});

// PART1 : UPDATE ASSOCIATION EMBEDDED ; CREATE ANOTHER USER AND A POST ; push the POST

var newUser = new User({
  email: "jamesg@gmail.com" ,
  name: "James Gordon"
});

var newPost={
  title: "jjjjj",
  content:"ggggg"
};

newUser.posts.push(newPost);

User.create(newUser,function(err,newUser){
  if(!err){
    console.log(newUser);
  }else{
    console.log(err);
  }
});
