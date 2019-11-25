## sampleNodeApp - MovieBlog

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
