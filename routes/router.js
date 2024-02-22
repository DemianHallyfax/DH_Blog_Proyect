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
var articleRange = parseInt(Article.length);
// console.log(articleRange);

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
    articles = await Article.find().sort({ createdAt: 'desc'}),
    articleList = await Article.find().sort({ createdAt: 'desc'});
    limit = parseInt(req.query.limit),
    rendResult = await paginatedResults(page, limit, articles);

  res.render("blog", {
    articleList,
    artRend : rendResult.results, 
    artRendNext : rendResult.next.page,
    artRendPrevius : rendResult.previus.page,
    indexLength : rendResult.index,
    articles,
    articleRange,
  });
});

router.get("/blog/:slug", async (req, res) => {
  /*let id = parseInt(req.params.id);
  const findValue = await articles.find((x) => x.id === id);*/

  const article = await Article.findOne({ slug: req.params.slug }),
    articleList = await Article.find().sort({ createdAt: 'desc'});
    if (article == null) res.redirect('/blog');
    res.render('blog-articles/articlesSheet', { 
      article: article,
      articleRange: articleRange,
      articleList : articleList 
    });

  /*let renderTitle = findValue.title,
    renderArticle = findValue.article,
    renderImg = findValue.img;

  renderArticle = dompurify.sanitize(marked.parse(renderArticle));

  res.render("blog-articles/articlesSheet", {
    renderTitle,
    renderArticle,
    renderImg,
    articleRange,
    articles,
  });*/
});
module.exports = router;
