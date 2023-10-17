const express = require("express"),
  app = express(),
  router = express.Router(),
  articles = require("../info_json/articlesTEST.json"),
  { paginatedResults } = require("./functions/func");

/*------------------------------------------
//MIDLEWARE
------------------------------------------*/
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

/*------------------------------------------
VARIABLES IMPORTANTES 
------------------------------------------*/
articles.reverse();
var articleRange = parseInt(articles.length);

/*------------------------------------------
RUTAS
------------------------------------------*/
router.get("/", (req, res) => {
  res.render("index", {
    articles,
    articleRange,
  });
});

router.get("/blog", async (req, res) => {
  const page = parseInt(req.query.page),
    limit = parseInt(req.query.limit),
    artRend = await paginatedResults(page, limit, articles).results,
    artRendNext = await paginatedResults(page, limit, articles).next.page,
    artRendPrevius = await paginatedResults(page, limit, articles).previus.page,
    indexLength = paginatedResults(page, limit, articles).index;

  // console.log(indexLength);

  res.render("blog", {
    artRend: artRend.results,
    artRendNext: artRendNext,
    artRendPrevius: artRendPrevius,
    indexLength: indexLength,
    articles,
    articleRange,
  });
});
module.exports = router;
