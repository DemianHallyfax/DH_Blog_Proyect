const express = require('express'),
    app = express(),
    router = express.Router(),
    articles = require("../info_json/articlesTEST.json");

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
router.get('/', (req, res) => {
    res.render('index', { 
        articles,
        articleRange
    });
});

router.get('/blog', async(req, res) => {
    /*
    PAGINACIÓN "SENCILLA"
    (Se que hay maneras de hacer este trabajo mas sencillo, 
    pero esta me gusta mas...)
    */
    const page = parseInt(req.query.page),
        limit = parseInt(req.query.limit);

    const artRend = await paginatedResults(page, limit);

    res.render('blog', {
        artRend,
        articles,
        articleRange
    });
});

/*------------------------------------------
FUNCION QUE CREA LA PAGINACIÓN Y DEVUELVE UN OBJETO CON EL CUAL TRABJAR.
------------------------------------------*/
function paginatedResults(page, limit) {
      const startIndex = (page - 1) * limit,
        endIndex = page * limit,
        results = {};
  
      return results.results = articles.slice(startIndex, endIndex);
  }
/*------------------------------------------
TESTING FUNCTION "paginatedResults()".
console.log(paginatedResults(1, 5));
------------------------------------------*/
module.exports = router;