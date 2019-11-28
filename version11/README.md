###  <u>   Part11: Flash Messages </u>
* #### Step1 : method-override

  => An old but useful documentation on [Connect-flash](https://github.com/jaredhanson/connect-flash)
  ```
  $ npm i connect-flash
  ```
  ```
  const flash = require("connect-flash")
  app.use("flash()")
  ```

 => First make necessary updates on middleware for isLoggedIn

  ```
  middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
      console.log("MIDDLEWARE RUNNING SUCCESSFULLY, NEXT");
      return next();
    }else{
      console.log("MIDDLEWARE FAILED");
      req.flash("error","Please Login First!")
      res.redirect("/login");
    }
  };

  ```

  => Then make sure that the next handling route will receive this.

  ```
  router.get("/login",function(req,res){
      console.log("request to login/ ") ;
      res.render("login",{message:req.flash("error")});
  });

  ```

  => Pass the message to ejs file ( possibly header )

  => Move `{message:req.flash("error")}` to res.locals so that all routes will have access.

  ```
  app.use(function(req,res,next){
   res.locals.currentUser = req.user ;
   res.locals.message = req.flash("error") ;
   next();
  });

  ```

  => In any route where `isLoggedIn` ; `req.flash("error","Please Login First!")` will be flashed by related middleware and passed to `/login` route.

  => When logout button is clicked ;  `req.flash("success","Logged you out! ")` will be flashed by logout route and passed to next route, which is  `(/)` in our case.

  => Update header.ejs with conditionals :

  ```
  <div class="container">
    <% if(error && error.length>0 ) { %>
      <div class="alert alert-danger" role="alert"> <%= error %> </div>
    <% } %>

    <% if(success && success.length>0 ) { %>
      <div class="alert alert-success" role="alert"> <%= success %> </div>
      <% } %>
  </div>

  ```

  ==> Flash could be added to any of the routes where necessary
