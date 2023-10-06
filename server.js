const express = require("express"),
  app = express(),
  storiesRouter = require('./routes/routerStories'),
  articleRouter = require("./routes/router");

app.set("view engine", "ejs");

app.use(articleRouter);
app.use(storiesRouter);

app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

app.listen(5000);
 