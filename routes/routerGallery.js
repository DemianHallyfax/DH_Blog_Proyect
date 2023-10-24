const express = require("express"),
  app = express(),
  routerGallery = express.Router();

/*---------------------------------------------
MIDLEWARE
---------------------------------------------*/
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

/*---------------------------------------------
VARIABLES IMPORTANTES 
---------------------------------------------*/

/*---------------------------------------------
GALLERY
---------------------------------------------*/

routerGallery.get("/Gallery", (req, res) => {
  res.render("gallery");
});

module.exports = routerGallery;
