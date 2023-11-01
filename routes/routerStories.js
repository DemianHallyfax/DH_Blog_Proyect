
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
storiesRouter.get("/stories/:id", async (req, res, next) => {
  const findValue = await stories.find((x) => x.idName === req.params.id);

  const id = req.params.id;

  let renderTitle = findValue.title,
    renderStorie = findValue.storie,
    renderTags = findValue.tags,
    renderDescription = findValue.description;

  const chapter = parseInt(req.query.chapter);

  

  let rendResult = paginatedResults(chapter, 1, renderStorie),
    rendPrevius = rendResult.previus.page,
    rendNext = rendResult.next.page,
    rendIndex = rendResult.index;

  // if (chapter > rendIndex.length) {
  //   res.redirect("/stories/index");

  //   next();
  // }

    renderStorie = rendResult.results.results[0].chapter;

    renderStorie = dompurify.sanitize(marked.parse(renderStorie));

  

  res.render("stories/storieSheet", {
    renderTitle,
    renderStorie,
    renderDescription,
    renderTags,
    rendNext,
    rendPrevius,
    rendIndex,
    id
  });

  
});
module.exports = storiesRouter;
