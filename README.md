## FullStackWebApp
#### by Bootstrap & Express with Node.JS & Mongoose with MongoDB

* ### Part1 : Ignite the Project

 * #### STEP 1 :

 // initialize git and build .gitignore file based on [Node.gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore#L3)

 // initialize and build package.json

 // Install express and ejs packages

 ```node
  $ npm init
  $ npm i express ejs
 ```

 * #### STEP 2:

 // Build app.js based on boilerplate

 // Build views folder for landing.ejs and movies.ejs

 // use a default array of listOfMovies to be rendered by movies.ejs, until a permanent database is built.

 // Build partials folder for header.ejs(with bootstrap) and footer.ejs

 // Include necessary code at the beginning and end of any rendered page :

 ```ejs
  <%- include('partials/header') -%>
  <%- include('partials/footer'); -%>
 ```

 * #### STEP3 :

 // adapt a post route and install bodyParser

 ```node
 $ npm i body-parser
```
So that req.body.title, req.body.image will be passed through the form

 // Don't miss the line `
  app.use(bodyParser.urlencoded({ extended: true }));`

 // Build a new ejs file for new items to be added : newMovie.ejs

 // Use a form with method="POST" and action="/movies" ;should be same as post route

 ```
  $ <form action="/movies" method="POST">
    <!-- should be same as post route -->
  $   <input type="text" name="title" placeholder="name of the movie">
  $   <input type="text" name="image" placeholder="image URL">
  $   <button type="submit" name="button"> submit </button>
  $ </form>

 ```

 * #### STEP4 :

 // Add Bootstrap link to header.ejs file
 // [fit-100-of-an-image-to-a-jumbotron](https://stackoverflow.com/questions/31147543/how-to-fit-100-of-an-image-to-a-jumbotron)




 * ### Part2 : DATA PERSISTANCE

  * #### STEP1 :

   // create new branch

   ```
   $ npm install mongoose
   ```

   // Update app.js with required code based on [Mongoose](https://mongoosejs.com/)

   // Build movieSchema : new mongoose.Schema is needed for complex scripts, whereas a JS Object is only for basic commands.

   ```
   $ const movieSchema = new mongoose.Schema({
   $   title: String,
   $   image: String,
   $   description: String,
   $ });

   & const Movie = mongoose.model('Movie', movieSchema);

   ```
   * #### STEP 2:

   // Migrate the default array of listOfMovies to the database by ` collection.insertMany` model at the related [link](https://mongoosejs.com/docs/api/model.html#model_Model.insertMany). ( Do this only once, as this will save the array to database permanently.)

   // Use db.collections.drop() and insert new items ; and then remove the default array of listOfMovies

   // Update schema and add the 3rd key of the documents as "description" ; update newMovie.ejs and index.ejs files for the new key

   // Update app.get("/movies") with

    `collection.find({},function(err,found){})` with reference to documentation [link](https://mongoosejs.com/docs/api/model.html#model_Model.find)

   // Update app.post("/movies") with `collection.create(document,function(err,insertedDoc){)` with reference to documentation [link](https://mongoosejs.com/docs/api/model.html#model_Model.create)

  * #### STEP 3:

   | file name   | url             | verb | desc                            |
   |--------|-----------------|------|---------------------------------|
   | index  | /movies         | GET  | find all and display the list   |
   | newMovie   | /movies/newMovie| GET  | display the form                |
   | movies | /movies         | POST | inserted a new one              |
   | show   | /movies/:id     | GET  | show details of a specific item |

   // Build the show route app.get("/movies/:id") with  `collection.findById` with referece to [link](https://mongoosejs.com/docs/api/model.html#model_Model.findById)

   // use `req.params.id` for `_id` of the object; which is passed data through index.ejs to app.js.

   // Create show.ejs file for the rendered movie



   * ### Part3 : MODELS

       * #### STEP1 :

   // build models folder comment.js and movie.j

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

* ### Part4 : NESTED ROUTES

    * #### Step1 Build Nested Routes

|   | name              | path                     | HTTP Verb | Mongoose Method          | Purpose                                           |
|---|-------------------|--------------------------|-----------|--------------------------|---------------------------------------------------|
| 1 | INDEX             | /movies                  | GET       | collection.find          | list all movies                                   |
| 2 | NEW               | /movies/newForm          | GET       | N/A                      | display the form for new movie                    |
| 3 | CREATE            | /movies                  | POST      | collection.create()      | insert a new movie                                |
| 4 | SHOW              | /movies/:id              | GET       | collection.findById()    | show details of selected movie                    |
|   | 4.a nested index  | /movies/:id/comments/    | GET       | collection.find()        | list all comments                                 |
|   | 4.b nested new    | /movies/:id/comments/new | GET       | N/A                      | display the form for new comment                  |
|   | 4.c nested create | /movies/:id/comments     | POST      | collection.create()      | insert a new comment                              |
|   | 4.d nested show   | /movies/:id/comments/:id | GET       | collection.findById()    | show details of selected comment                  |
| 5 | EDIT              | /movies/:id/edit         | GET       | post.findById()          | Show edit form for one post                       |
| 6 | UPDATE            | /movies/:id              | PUT       | post.findByIdAndUpdate() | Update particular post, then redirect             |
| 7 | DESTROY           | /movies/:id              | DELETE    | post.findByIdAndRemove() | Delete a particular post, then redirect somewhere |

*
   - #### Step2

  // Build seeds.js ending with `module.exports = seedDB;

  //Create separate folders as movies and comments, for the related ejs files in views folder

  // Don't forget to update the route for the partials (footer and header), as the working directory will be updated (in app.js and index.ejs )

  // Add the logic for the routes 4b and 4c to the app.js file ; as mentioned on table above

- 4.b For get route use populate for the associated schemas :
  ```
Movie.findById(req.params.id).populate("comments").exec(function(err,whichMovietoComment){
  ```

- 4.c For post route, go step by step
 - create a new comment
 - look up movie using ID
 - connect new comment to movie
 - redirect to showpage

 // build newComment.ejs ; for the id: part you'll need another rendering on app.js (similar to edit, on RESTFUL APIs)

----

#### IMPORTANT HINT !!!
##### Advanced Javascript

// [Express-Sanitizer](https://www.npmjs.com/package/express-sanitizer) is recommended to prevent cross site scripting

Sample :

```
$ npm i express-sanitizer
$ const expressSanitizer = require('express-sanitizer');
$ app.use(expressSanitizer());
$ req.body.comment.text = req.sanitize(req.body.comment.text);

```
----

* ### Part5 : Public Folder for Styling with CSS and JS

  // Style showOneMovie.ejs by using Bootstrap4

  // Build public folder, in the same directory with app.js, to include specific CSS and JS files

  Those are all alternatives to use  :

  ```
$ app.use(express.static("public"));
$ app.use(express.static("./public"));
$ app.use(express.static(__dirname + "/public"));

  ```

  In case of any issues, [this stackoverflow link](https://stackoverflow.com/questions/48248832/stylesheet-not-loaded-because-of-mime-type) might help

  // You can now move the style tag for backgroundpicture inside header.ejs to main.css as well

  // You will also have to add new resource to header.ejs , after bootstrap such as `<link rel="stylesheet" href="/stylesheets/main.css">`

* ### Part6 : Adding Authentication

    * #### Step1 Install and require the modules

  ```
   $ npm i passport passport-local passport-local-mongoose express-session
  ```

  ```
   const session = require('express-session');
   const passport = require("passport");
   const passportLocalMongoose = require('passport-local-mongoose');
   ```

   * #### optional (whether you're using createStrategy in passportLocalMongoose or not):

  ```
  LocalStrategy = require (passport-local);
  passport.use(new LocalStrategy(User.authenticate()));
  ```
   or go straight with the new approach:

  ```
  passport.use(User.createStrategy());

  ```

  * ####  Build a userSchema in models folder and require in app.js  :

  ```
  const mongoose = require('mongoose');
  var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  });
  const User = mongoose.model("User",userSchema);
  userSchema.plugin(passportLocalMongoose);
  module.exports = User ;
 ```

  * #### Step 2 Setup express-session

  Note : Queue of the syntax is important; express-session should be called by below syntax, before DB session is established and after other app.use functions :

  ```
  app.use(session({
    secret: 'moviesDB-buraku',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  }));

     or

  app.use(require("express-session")( {
    secret :" used to encrypt and decrypt " ,
    resave : false ,
    saveUninitialized : false

  }));

   ```

   => Setup passport  :

  ```
     app.use(passport.initialize());
     app.use(passport.session());
 ```

   // Integrate passportLocalMongoose to User Model. This will hash and salt the passwords before saving to database; and does a lot of heavy lifting for us!

   ```
 const passportLocalMongoose = require('passport-local-mongoose');
 userSchema.plugin(passportLocalMongoose);
   ```

  // Enable authentication; in the new approach USE `User.createStrategy()` INSTEAD OF `new LocalStrategy(User.authenticate());`

  // Use static `serialize` and `deserialize` of model for passport session support

  ```
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
  ```

  * #### Step 3 Auth Routes

  => Build register.ejs  and login.ejs in views folder

   => Add auth ( register and login ) routes to app.js. User.register method is provided by passport-local-mongoose

   <u>  register route : </u>

   ```  
   app.get("/register", function(req, res) {
     res.render("register");
   });

   app.post("/register", function(req, res) {
     const newUser= new User({
       username: req.body.username
     });
     User.register(newUser, req.body.password, function(err, user) {
       if (err) {
         console.log(err);
         res.redirect("/register");
       }else{
         passport.authenticate('local')(req, res, function() {
           res.redirect('/secret');
         });
       }
     });
   });

   ```
   <u> login route version 1: </u>

   ```  
   app.get("/login", function(req, res) {
    res.render("login");
  }); {}

   app.post("/login", passport.authenticate("local", {
      successRedirect: "/movies",
      failureRedirect: "/login"
  }) ,function(req, res){
  });

   ```
   <u> login route version 2: </u>

   ```  
   app.post("/login", function(req, res) {
     const user = new User({
       username: req.body.username,
       password: req.body.passport
     });
     req.login(user, function(err) {
       if (err) {
         console.log(err);
         console.log("LOGIN FAILED");
       }else{
         passport.authenticate('local')(req, res, function() {
           console.log("LOGIN SUCCESS");
           res.redirect('/movies');
         });
       }
     });
   });

   ```
  <u>  logout route : </u>

   ```  
   app.get("/logout", function(req, res){
       req.logout();
       res.redirect("/");
   });

   ```

  // update header.ejs file in partials with `ìf`statement to show/hide auth links :

   ```
   <%  if(!currentUser) { %>
     <li class="nav-item"><a class="nav-link" href="/login">Login</a> </li>
     <li class="nav-item"><a class="nav-link" href="/register">Sign Up</a></li>
   <% } else { %>
     <li class="nav-item"> <a class="nav-link" href="#"> signed in as  <%= currentUser.username %> </a> </li>
     <li class="nav-item"> <a class="nav-link" href="/logout">Logout</a></li>
   <% } %>

   ```


* ### Part7 : Refactoring Routes

  => make a new directory called "routes" in the same folder as app.js; that will include 3 main route files :

    ```
     $ mkdir routes
     $ touch routes/movies.js
     $ touch routes/comments.js
     $ touch routes/auths.js
   ```
    => Copy and past the related logic to each of the created files

    => Require express and use router in each of files , to return a value :

    ```
     const express = require("express");
     const router = express.Router();
     ...
     module.exports = router
   ```
   // replace all `app.` with `router.` as we will need to pass path params betweens files in the optional part ( :id from comment.ejs to app.js )

    => Require the created routes in app.js and call each :

    ```
     const commentRoutes = require("./routes/comments");
     const movieRoutes = require("./routes/movies");  
     const authRoutes = require("./routes/auth");
     app.use(commentRoutes);
     app.use(movieRoutes);
     app.use(authRoutes);
   ```
   => Work on warnings on each of created route files, eliminate them by requiring needed dependencies

    => Optional:  Place the routes in app.use functions and remove from created routes ...

    ```
     app.use("/", authRoutes);
     app.use("/movies", movieRoutes);
     app.use("/movies/:id/comments", commentRoutes);
   ```
    => to be able to use ":id" you should merge params in the file it's included ( comment.js, in this case).
    ```
    const router = express.Router({mergeParams:true});
    ```

* ### Part8 : User Associations-Comment

    => Update the author in comment model to include user data

     ```
     // === FROM THIS : ===

     var commentSchema = new mongoose.Schema({
         text: String,
         author: String
     });

     // === TO THIS : ===
      var commentSchema = new mongoose.Schema({
          text: String,
          author: {
           id:  {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          },
           username: String,
         }
      });

     ```

     <u>Note1 :</u> It could be just the id inside the commentSchema, but that would require additional queries to receive username ; for which Mongoose provides an easier alternative.

     <u>Note2 :</u> the author will be single due to one to one relationship ( each comment needs to belong to one user ) , thus it's just one object with two items, rather than an array of objects in one to many relationships ()

     => Drop database through mongo shell and remove seedDB for a manual entry

     => use `req.user` in post comment route within app.js to pass data through after login.

     ```
    comment.author.id = req.user._id ;
    comment.author.username = req.user.username
    comment.save();

     ```

     => Update newComment.ejs not to request username

     => Update showMovie.ejs to show author.username

* ### Part9 : User Associations-Movie

    * #### Step1 : Only authenticated user can add a new movie

       => Use `isLoggedIn` middleware to render newComment and post one.

    * #### Step2 : Username + id should be associated with the movie

       => Update movie.js model to include user data in movieSchema :

            ```
            // === FROM THIS : ===

            const movieSchema = new mongoose.Schema({
              title: String,
              image: String,
              description: String,
              comments : [
                {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Comment"
                }
              ]
            });

            // === TO THIS : ===

            const movieSchema = new mongoose.Schema({
              title: String,
              image: String,
              description: String,
              comments : [
                {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Comment"
                }
              ],
              author: {
               id:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
              },
               username: String,
             }
            });

            ```

      Note1 : It could be just the id inside the movieSchema, but that would require additional queries to receive username ; for which Mongoose provides an easier alternative.

      Note2 : the author will be single due to one to one relationship ( each movie needs to belong to one user ) , thus it's just one object with two items, rather than an array of items in one to many relationships (such as movies and comments)

       => Update posting a new movie route with the new schema :
       => use `req.user` in post movie route within app.js to pass data through after login.

     ```  
     // add this part as opt1
     var newMovie={
       title: req.body.title,
       image: req.body.image,
       description: req.body.description,
       author: {
         id: req.user._id,
         username: req.user.username,
       },
     };
     ```

     ```
     // Or add this part as opt2

     newMovie.author.id = req.user._id;
     newMovie.author.username = req.user.username;

     ```

      => Drop database through mongo shell and remove seedDB for a manual entry

      => Update showMovie.ejs to show author.username , as submitted by ...( to get rid of previous entries with different schema)

* ### Part10 : Part10A: Complete RESTful APIs  (EDIT & UPDATE & DELETE)
  * #### Step1 : method-override

  => HTML forms do not support PUT and DELETE requests; for which you will need [method-override](https://www.npmjs.com/package/method-override):
  ```
  $ npm i method-override
  ```
  ```
  var methodOverride = require('method-override')
  app.use(methodOverride('_method'))
  ```


  * #### Step2 : Work on edit route in movies.js

    ```
    router.get("/:id/edit",function(req,res){
      console.log("**** RESTAPI: 5-EDIT ; request made to editMovie.ejs ");
      Movie.findById(req.params.id).populate("comments").exec(function(err,editedMovie){
        if(!err){
          res.render("movies/editMovie",{editedMovie:editedMovie});
          console.log(editedMovie);
        }else{
          console.log(err);
        }
      });
    });

    ```

    => Add a link to shownMovie.ejs for edit route (editMovie.ejs)

    => Build editMovie.ejs, which will be similar to newMovie.ejs except for post(put) route and values


  * #### Step3 : Work on update route in movies.js

  => alternative 1 :

  ```
  router.put("/:id",function(req,res){
    console.log("**** RESTAPI: 6-PUT ; request made to showMovie.ejs ");
    var updatedMovie={
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      author: {
        id: req.user._id,
        username: req.user.username,
      },
    };
    updatedMovie.author.id = req.user._id;
    updatedMovie.author.username = req.user.username;
    Movie.findByIdAndUpdate(req.params.id,updatedMovie,function(err,updatedMovie){
      if(!err){
        console.log(updatedMovie);
        res.redirect("/movies/");
      }else {
        res.redirect("/posts");
      }
    });
  });

  ```

  => shorter version : Use an object for the values in editMovie

    ```
    name="title" ==> name="editedMovie[title]"
    name="image" ==> "editedMovie[image]"
    name="description" ==> "editedMovie[description]"

    ```

    ```
    router.put("/:id",function(req,res){
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
    ```

    * #### Step4 : Work on delete route in movies.js

      => Add the delete route to app.js

      ```
      router.delete("/:id",function(req,res){
        console.log("**** RESTAPI: 7-DELETE ; request made to showMovie.ejs ");
        Movie.findByIdAndRemove(req.params.id,function(err,deletedPost){
          if(!err){
            res.redirect("/movies");
          }else{
            console.log(err);
          }
        });
      });
      ```

      => Add a form with post request to shownMovie.ejs for the delete route

      => Make the form in-line by using id, as it's a block level element and update stylescss file.

      ```
      <form class="form-inline mb-2 " action="/movies/<%=shownMovie._id%>?_method=DELETE" method="POST">
         <a class="btn btn-outline-warning btn-sm d-inline ml-1" href="/movies/<%=shownMovie._id %>/edit" role="button"> edit </a>
         <button type="submit" class="btn btn-outline-danger btn-sm ml-1">delete</button>
       </form>

      ```

    * #### Step5 : Authorization

      => You can't edit, post or delete unless you own the campground

      ```
      function checkMovieAuthorization(req, res, next){
          if(req.isAuthenticated()){
              console.log("*****AUTHENTICATED*****");
              Movie.findById(req.params.id, function (err, foundMovie){
                  if(err) {
                      console.log("MOVIE NOT FOUND");
                      res.redirect("back");
                  }else {
                      console.log("MOVIE FOUND");
                      if(foundMovie.author.id.equals(req.user._id)){
                          console.log("*****AUTHORIZED*****");
                          next();
                      }else{
                          console.log("-----NOT AUTHORIZED-----");
                          res.redirect("back");
                      }
                  }
              });
          }else{
            console.log("----- NOT AUTHENTICATED----");
            res.redirect("back");
          }
      }
      ```

      => Update show.ejs , for edit and delete links to be visible only for authorized users

      => instead of '===' use 'equals(...)' since req.user.id is not a string but an object

        ```
        <%  if(currentUser && shownMovie.author.id.equals(currentUser._id)) { %>
        ```

* ### Part10 : ... Complete RESTful APIs  (EDIT & UPDATE & DELETE)
  * #### Step1 : Work on edit route

    => Build editComment.ejs by using values instead of placeholders and updating links

    => Add edit button to showMovie.ejs, for editComment.ejs. It will be at the end of each loop for rendering comments.

    Comments are array of objects within Movies, we're rendering one by one; and adding a link at the end of each loop.

  ```
  <form class="form-inline mb-2" action="/movies/<%=shownMovie._id%>/comments/<%=comment._id%>?_method=DELETE" method="POST">
    <a class="btn btn-outline-warning btn-sm d-inline ml-1" href="/movies/<%=shownMovie._id %>/comments/<%=comment._id %>" role="button"> edit </a>
  <button type="submit" class="btn btn-outline-danger btn-sm ml-1">delete</button>
  </form>

  ```
=> Add edit route for comments
```
router.get("/:comment_id/edit",(req,res)=>{
  console.log("**** Nested RESTAPI: 4.5 POST request made to /movies/:id/comments/:comment_id/edit to render editCommentForm ");
  Comment.findById(req.params.comment_id, function(err,editedComment){
    if(!err){
      res.render("comments/editComment",{editedComment:editedComment,shownMovieId: req.params.id});
                console.log(editedComment);
              }else{
                console.log(err);
              }
            });
          });
```

* #### Step2 : Work on update route

  => Add Update route

  => Add a form for POST Request to editComment.ejs

  Again, `{shownMovieId: req.params.id});` in edit route is in deed already on the url and needed to passed over again for the link to work properly.

  ```
  router.put("/:comment_id",(req,res)=>{
    console.log("**** Nested RESTAPI: 4.6 PUT request made to /movies/:id/comments/:comment_id through editCommentForm ");
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.editedComment,function(err,updatedComment){
      if(!err){
        console.log(updatedComment);
        res.redirect("/movies/" + req.params.id );
      }else {
        res.redirect("back");
      }
    });
  });
  ```

* #### Step3 : Work on delete route

  => Add delete Route

  ```
  router.delete("/:comment_id",(req,res)=>{
    console.log("**** Nested RESTAPI: 4.7 DELETE request made to /movies/:id/comments/:comment_id through showMovies");
    Comment.findByIdAndRemove(req.params.comment_id,function(err,deletedMovie){
      if(!err){
        console.log(deletedMovie);
        res.redirect("/movies/" + req.params.id );
      }else {
        res.redirect("back");
      }
    });
  });

  ```

  => Add a form for POST Request to showMovie.ejs ( similar to edit )

  ```
  <form class="form-inline mb-2" action="/movies/<%=shownMovie._id%>/comments/<%=comment._id%>?_method=DELETE" method="POST">
  ```

  * #### Step4 : Authorization

  => You can't edit, post or delete unless you own the comment

  ```
    function checkCommentAuthorization(req, res, next){
        if(req.isAuthenticated()){
            console.log("*****AUTHENTICATED*****");
            Comment.findById(req.params.comment_id, function (err, foundComment){
                if(err) {
                    console.log("COMMENT NOT FOUND");
                    res.redirect("back");
                }else {
                    console.log("COMMENT FOUND");
                    if(foundComment.author.id.equals(req.user._id)){
                        console.log("*****AUTHORIZED*****");
                        next();
                    }else{
                        console.log("-----NOT AUTHORIZED-----");
                        res.redirect("back");
                    }
                }
            });
        }else{
          console.log("----- NOT AUTHENTICATED----");
          res.redirect("back");
        }
    }
    ```

  => Update show.ejs , for edit and delete links to be visible only for authorized users

  => instead of '===' use 'equals(...)' since req.user.id is not a string but an object

  ```
  <%  if(currentUser && comment.author.id.equals(currentUser._id)) { %>
  ```
###  <u>  ** Part10C: Build middleware for authenticaton and authorization **

  => Build a middleware folder in the same directory with app.js
  => Create an index.js file within this folder with the related functions

  ```
var Movie = require("../models/divesite.js") ;
var Comment = require("../models/comment.js") ;
var middlewareObj= {} ;

  middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
      console.log("MIDDLEWARE RUNNING SUCCESSFULLY, NEXT");
      return next();
    }else{
      console.log("MIDDLEWARE FAILED");
      res.redirect("/login");
    }
  }

  middlewareObj.checkCommentAuthorization = function (req, res, next){
      if(req.isAuthenticated()){
          console.log("*****AUTHENTICATED*****");
          Comment.findById(req.params.comment_id, function (err, foundComment){
              if(err) {
                  console.log("COMMENT NOT FOUND");
                  res.redirect("back");
              }else {
                  console.log("COMMENT FOUND");
                  if(foundComment.author.id.equals(req.user._id)){
                      console.log("*****AUTHORIZED*****");
                      next();
                  }else{
                      console.log("-----NOT AUTHORIZED-----");
                      res.redirect("back");
                  }
              }
          });
      }else{
        console.log("----- NOT AUTHENTICATED----");
        res.redirect("back");
      }
  }

  middlewareObj.checkMovieAuthorization = function (req, res, next){
      if(req.isAuthenticated()){
          console.log("*****AUTHENTICATED*****");
          Movie.findById(req.params.id, function (err, foundMovie){
              if(err) {
                  console.log("MOVIE NOT FOUND");
                  res.redirect("back");
              }else {
                  console.log("MOVIE FOUND");
                  if(foundMovie.author.id.equals(req.user._id)){
                      console.log("*****AUTHORIZED*****");
                      next();
                  }else{
                      console.log("-----NOT AUTHORIZED-----");
                      res.redirect("back");
                  }
              }
          });
      }else{
        console.log("----- NOT AUTHENTICATED----");
        res.redirect("back");
      }
  }

  module.exports = middlewareObj;

  ```

  => Require the middware.js file in comments and movies ( where it will be called)

  ```
const middware = require("../middleware/middleware");
  ```

  => Require movie and comment model in middleware.js
