const express = require("express"),
  storiesRouter = express.Router(),
  app = express(),
  storiesTEST = require("../info_json/stories-testing.json");

//---------------------------------------------
//MIDLEWARE
//---------------------------------------------
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

//---------------------------------------------
//VARIABLES IMPORTANTES 
//---------------------------------------------
let storiesRange = parseInt(Object.keys(storiesTEST[0].stories[0]).length);

//---------------------------------------------
//INDEX PARA HISTORIAS
//---------------------------------------------
storiesRouter.get("/stories/index", (req, res) => {
  res.render("stories", {
    storiesTEST,
    storiesRange,
  });
});

//---------------------------------------------
//STORIES
//---------------------------------------------
storiesRouter.get("/stories/:id", async (req, res) => {
  const findValue = await storiesTEST[0].stories.find((x) => x.idName === req.params.id);

  let renderTitle = findValue.title,
      renderStorie = findValue.storie,
      renderTags = findValue.tags,
      renderDescription = findValue.tags

  res.render("stories/storieSheet", {
    renderTitle,
    renderStorie,
    renderDescription,
    renderTags,
  });
});
module.exports = storiesRouter;

