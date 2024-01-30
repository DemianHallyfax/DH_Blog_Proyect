const express = require('express'),
    app = express();
    routerSGDH = express.Router(),
    articles = require("../info_json/articlesTEST.json");

app.use(express.static(__dirname + '/public'));
app.use('/public', express.static('public'));

routerSGDH.get('/SGDH/lobby', (req, res) => {
    res.render('SGDH');
});

routerSGDH.get('/SGDH/articles', (req, res) => {
    res.render('SGDH/articles', articles);
});

routerSGDH.get('/SGDH/articles/new', (req, res) => {
    res.render('SGDH/new');
});

routerSGDH.get('/SGDH/articles/:id', async (req, res) => {
    const id = req.params.id,
       findArticle = await articles.find((x) => x.id === id);
    
    const renderArticle = {
        title: findArticle.title,
        img: findArticle.img,
        imgTemp: findArticle.imgTemplate,
        description: findArticle.description,
        article: findArticle.article
    }
    
    res.render('SGDH/articleEdit', {renderArticle});
});

module.exports = routerSGDH;