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

    * #### STEP2 :

   // Migrate the default array of listOfMovies to the database by ` collection.insertMany` model at the related [link](https://mongoosejs.com/docs/api/model.html#model_Model.insertMany). ( Do this only once, as this will save the array to database permanently.)

   // Use db.collections.drop() and insert new items ; and then remove the default array of listOfMovies

   // Update schema and add the 3rd key of the documents as "description" ; update newMovie.ejs and index.ejs files for the new key

   // Update app.get("/movies") with

    `collection.find({},function(err,found){})` with reference to documentation [link](https://mongoosejs.com/docs/api/model.html#model_Model.find)

   // Update app.post("/movies") with `collection.create(document,function(err,insertedDoc){)` with reference to documentation [link](https://mongoosejs.com/docs/api/model.html#model_Model.create)

    * #### STEP 3: RESTFUL ROUTES

   | file name   | url             | verb | desc                            |
   |--------|-----------------|------|---------------------------------|
   | index  | /movies         | GET  | find all and display the list   |
   | newMovie   | /movies/newMovie| GET  | display the form                |
   | movies | /movies         | POST | inserted a new one              |
   | show   | /movies/:id     | GET  | show details of a specific item |

   // Build the show route app.get("/movies/:id") with  `collection.findById` with referece to [link](https://mongoosejs.com/docs/api/model.html#model_Model.findById)

   // use `req.params.id` for `_id` of the object; which is passed data through index.ejs to app.js.

   // Create show.ejs file for the rendered movie
