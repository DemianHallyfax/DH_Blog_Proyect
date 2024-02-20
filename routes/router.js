const express = require("express"),
  app = express(),
  router = express.Router(),
  /*articles = require("../info_json/articlesTEST.json")*/
  Article = require("./../models/article"),
  stories = require("../info_json/stories-testing.json"),
  { paginatedResults } = require("./functions/func"),
  marked = require("marked"),
  createDomPurify = require("dompurify"),
  { JSDOM } = require("jsdom"),
  dompurify = createDomPurify(new JSDOM().window);

/*------------------------------------------
//MIDLEWARE
------------------------------------------*/
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

/*------------------------------------------
VARIABLES IMPORTANTES 
------------------------------------------*/
// articles.reverse();
// var articleRange = parseInt(articles.length);

/*------------------------------------------
RUTAS
------------------------------------------*/
router.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc'});

  res.render("index", {
    articles,
    stories,
  });
});

router.get("/QuienSoy", async (req, res) => {
  res.render("quienSoy");
});

router.get("/blog", async (req, res) => {

  const page = parseInt(req.query.page),
    articles = Article.find().sort({ createdAt: 'desc'});
    limit = parseInt(req.query.limit),
    rendResult = await paginatedResults(page, limit, articles),
    artRend = rendResult.results, 
    artRendNext = rendResult.next.page,
    artRendPrevius = rendResult.previus.page,
    indexLength = rendResult.index;

  res.render("blog", {
    artRend,
    artRendNext,
    artRendPrevius,
    indexLength,
    articles,
    articleRange,
  });
});

router.get("/blog/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const findValue = await articles.find((x) => x.id === id);

  let renderTitle = findValue.title,
    renderArticle = findValue.article,
    renderImg = findValue.img;

  renderArticle = dompurify.sanitize(marked.parse(renderArticle));

  res.render("blog-articles/articlesSheet", {
    renderTitle,
    renderArticle,
    renderImg,
    articleRange,
    articles,
  });
});
module.exports = router;
