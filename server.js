const express = require("express"),
  app = express(),
  methodOverride = require("method-override"),
  storiesRouter = require("./routes/routerStories"),
  articleRouter = require("./routes/router"),
  routerGallery = require("./routes/routerGallery"),
  routerSGDH = require('./routes/routerSGDH'),
  PORT = 5000,
  mongoose = require('mongoose');

/*---------------------------------------------
MIDLEWARE
---------------------------------------------*/
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
try {
  mongoose.connect('mongodb://127.0.0.1:27017/Demian_Hallyfax_Blog');
  console.log('Data base connected.');
} catch (error) {
  console.log(error);
}

/*---------------------------------------------
ROUTERS
---------------------------------------------*/
app.use(articleRouter);
app.use(storiesRouter);
app.use(routerGallery);
app.use(routerSGDH);
app.use(methodOverride('_method'));

/*---------------------------------------------
EXTRAS
---------------------------------------------*/
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

// app.listen(5000);
app.listen(PORT)
