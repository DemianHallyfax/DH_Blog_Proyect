
const express = require("express"),
marked = require("marked"),
createDomPurify = require("dompurify"),
{ JSDOM } = require("jsdom"),
dompurify = createDomPurify(new JSDOM().window),
storiesRouter = express.Router(),
app = express(),
storiesJSON = require("../info_json/stories-testing.json"),
{ paginatedResults } = require("./functions/func");

/*---------------------------------------------
MIDLEWARE
---------------------------------------------*/
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

/*---------------------------------------------
VARIABLES IMPORTANTES 
---------------------------------------------*/
let stories = storiesJSON[0].stories;
stories.reverse();
let storiesRange = parseInt(Object.keys(stories[0]).length);

/*---------------------------------------------
INDEX PARA HISTORIAS
---------------------------------------------*/
storiesRouter.get("/stories/index", (req, res) => {
  res.render("stories", {
    stories,
    storiesRange,
  });
});

/*---------------------------------------------
STORIES
---------------------------------------------*/
storiesRouter.get("/stories/:id", async (req, res) => {
  const findValue = await stories.find((x) => x.idName === req.params.id);

  let renderTitle = findValue.title,
    renderStorie = findValue.storie,
    renderTags = findValue.tags,
    renderDescription = findValue.description;

  const chapter = parseInt(req.query.chapter);

  let value = {};

     if (renderStorie.length >= 2) {
        value = paginatedResults(1, 1, renderStorie).results;
        renderStorie = value.results[0].chapter;
    }

    console.log(renderStorie);

    renderStorie = dompurify.sanitize(marked.parse(renderStorie));

  res.render("stories/storieSheet", {
    renderTitle,
    renderStorie,
    renderDescription,
    renderTags,
  });
});
module.exports = storiesRouter;
