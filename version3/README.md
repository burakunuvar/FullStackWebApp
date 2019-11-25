
* ### Part3 : Models and Data Association

 * #### Step1

// build models folder

// Update movieSchema with comments , create a separate file as movie.js; including `module.exports = Movie`

// Create commentSchema, create a seperate file as comment.js ; including `module.exports = Comment`

// Update app.js by removing Movie movieSchema and requiring new models created above

// views, models and public folder(for styling and scripts), will all be in the same directory with app.js

Those are all alternatives to locate the directory :

```  
$ app.use(express.static("public"));
$ app.use(express.static("./public"));
$ app.use(express.static(__dirname + "/public"))
```

 * #### Step2

// Build seeds.js ending with `module.exports = seedDB;`

// display comments by using populate.exec. So update `app.get("/movies/:id",function(req,res){` by replacing

```
Movie.findById(req.params.id,function(err,shownMovie){
  if(!err){
    res.render("show",{shownMovie:shownMovie});
    console.log(shownMovie);
  }else{
    console.log(err);
  }
});

```
 with

```
Movie.findById(req.params.id).populate("comments").exec(function(err,shownMovie){
  if(!err){
    res.render("show",{shownMovie:shownMovie});
    console.log(shownMovie);
  }else{
    console.log(err);
  }
});

```

 * #### Step3

 // Update show.ejs by including comments, which is an array of objects inside movies collection.

 ```
$ <% shownMovie.comments.forEach(function(comment){ %>
$   <h5> <%= comment %></h5>
$   <p>
$       <strong><%= comment["author"] %></strong> - <%=comment.text %>
$       <br>
$     <strong><%= comment.author %></strong> - <%= comment["text"] %>
$   </p>
$ <% }) %>

 ```

 ----
 #### IMPORTANT HINT !!!
 ##### FILE DIRECTORIES

   - `/` => go back to the root folder, then traverse forward/downward.

   - `./` => begin in the folder we are currently in (current working directory) and traverse forward/downward in the tree. ( same with using nth ? )

   - `../` => go up one directory, then begin the traverse.

----


 ----
 #### IMPORTANT HINT !!!
 ##### Advanced Javascript

   // Javascript is a single threaded non blocking programming language with a synchronous js engine; and async js runtime. It has a call stack & event loop & callback queue and other apis... [a related video JSConf](https://www.youtube.com/watch?v=8aGhZQkoFbQ). Code is being run by the js engine in a sequence and for a non blocking flow we need to use callbacks for apis of runtime.

   // Don't make functions within a loop, [click for details](https://www.youtube.com/watch?v=Nqfs14iu_us)

  ----
