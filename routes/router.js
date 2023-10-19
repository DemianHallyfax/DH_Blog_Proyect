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
articles[0].articles.reverse();
var articleRange = parseInt(articles[0].articles.length);

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

router.get("/blog/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const findValue = await articles[0].articles.find(
    (x) => x.id === id
  );

  let renderTitle = findValue.title,
    renderArticle = findValue.article,
    renderImg = findValue.img;

  res.render("blog-articles/articlesSheet", {
    renderTitle,
    renderArticle,
    renderImg,
    articleRange,
    articles,
  });
});
module.exports = router;
