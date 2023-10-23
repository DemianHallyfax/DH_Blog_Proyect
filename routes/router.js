const express = require("express"),
  app = express(),
  router = express.Router(),
  articlesJSON = require("../info_json/articlesTEST.json"),
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
let articles = articlesJSON[0].articles;

articles.reverse();
var articleRange = parseInt(articles.length);



/*------------------------------------------
RUTAS
------------------------------------------*/
router.get("/", (req, res) => {
  res.render("index", {
    articles,
    articleRange,
    stories
  });
});

router.get("/QuienSoy", async (req, res) => {
  res.render("quienSoy")
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
  const findValue = await articles.find(
    (x) => x.id === id
  );

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


