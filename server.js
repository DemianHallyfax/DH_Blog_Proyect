const express = require("express"),
  app = express(),
  storiesRouter = require("./routes/routerStories"),
  articleRouter = require("./routes/router"),
  paginationRouter = require("./routes/pagination");

/*---------------------------------------------
MIDLEWARE
---------------------------------------------*/
app.set("view engine", "ejs");

/*---------------------------------------------
ROUTERS
---------------------------------------------*/
app.use(articleRouter);
app.use(storiesRouter);
app.use(paginationRouter);

/*---------------------------------------------
EXTRAS
---------------------------------------------*/
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));


app.listen(5000);
