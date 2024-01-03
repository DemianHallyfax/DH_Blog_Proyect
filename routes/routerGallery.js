const express = require("express"),
  app = express(),
  routerGallery = express.Router()
  gallery = require("../info_json/galleryPhotos.json");

/*---------------------------------------------
MIDLEWARE
---------------------------------------------*/
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

/*---------------------------------------------
VARIABLES IMPORTANTES 
---------------------------------------------*/
gallery.reverse();

/*---------------------------------------------
GALLERY
---------------------------------------------*/

routerGallery.get("/Gallery", (req, res) => {
  res.render("gallery", {
    gallery
  });
});

routerGallery.get("/Gallery/:id", (req, res) => {
  const findValue = findPhoto(req.params.id, gallery);

  const renderTitle = findValue.title,
    renderImage = findValue.image,
    renderDescription = findValue.description;

  res.render("gallery/gallerySheet", {
    renderTitle,
    renderDescription,
    renderImage
  });
});

function findPhoto(id, module) {
  const value = module.find((x) => x.id == id);
  return value;
}

module.exports = routerGallery;
