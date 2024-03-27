const express = require("express"),
  app = express();
(routerSGDH = express.Router()), (Article = require("./../models/article"));

app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

routerSGDH.get("/SGDH/lobby", (req, res) => {
  res.render("SGDH");
});
/* MOSTRAR / CREAR ARTICULOS --------------------*/
routerSGDH.get("/SGDH/articles", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("SGDH/articles", { articles });
});

routerSGDH.get("/SGDH/articles/new", (req, res) => {
  res.render("SGDH/new", { article: new Article() });
});

routerSGDH.post(
  "/SGDH/articles",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

routerSGDH.get("/SGDH/articles/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/SGDH/articles");
  res.render("blog-articles/show", { article: article });
});

/* EDITAR ARTICULOS ------------------------------*/
routerSGDH.get("/SGDH/articles/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("SGDH/edit", { article: article });
});

routerSGDH.put(
  "/SGDH/articles/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

/* BORRAR ARTICULOS -------------------------------*/
routerSGDH.delete("/SGDH/articles/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/SGDH/articles");
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    (article.title = req.body.title),
      (article.img = req.body.img),
      (article.imgTemp = req.body.imgTemp),
      (article.description = req.body.description),
      (article.article = req.body.article);
    try {
      article = await article.save();
      res.redirect(`/SGDH/articles/${article.slug}`);
    } catch (e) {
      res.render(`/SGDH/articles/${path}`, { article: article });
    }
  };
}

module.exports = routerSGDH;
