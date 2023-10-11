const express = require('express'),
    app = express(),
    router = express.Router(),
    articlesTEST = require("../info_json/articlesTEST.json"),
    info = require('../info_json/info.json'),
    pagination = require('./pagination'),
    storiesTesting = require("../info_json/stories-testingTwo.json");

//---------------------------------------------
//MIDLEWARE
//---------------------------------------------
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));



//---------------------------------------------
//VARIABLES IMPORTANTES 
//---------------------------------------------
articlesTEST.reverse();
var articleRange = parseInt(articlesTEST.length);

//---------------------------------------------
//RUTAS
//---------------------------------------------
router.get('/', (req, res) => {
    res.render('index', { 
        articles: articlesTEST, 
        info:info, 
        articleRange:articleRange 
    });
});

router.get('/blog', (req, res) => {
    res.render('blog', {
        articles: articlesTEST, 
        info:info, 
        articleRange:articleRange
    });
});

module.exports = router;