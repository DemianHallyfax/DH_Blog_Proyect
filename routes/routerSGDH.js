const express = require('express'),
    app = express();
    routerSGDH = express.Router(),
    Article = require("./../models/article");

app.use(express.static(__dirname + '/public'));
app.use('/public', express.static('public'));

routerSGDH.get('/SGDH/lobby', (req, res) => {
    res.render('SGDH');
});

routerSGDH.get('/SGDH/articles', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'});
    res.render('SGDH/articles', { articles });
});
routerSGDH.post('/SGDH/articles', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        img: req.body.img,
        imgTemp: req.body.imgTemp,
        description: req.body.description,
        article: req.body.article
    });

    try{
        article = await article.save();
        res.redirect(`/SGDH/articles/${article.id}`)
    } catch (e){
        console.log(e)
        res.render('SGDH/new', { article: article })
    }

});

routerSGDH.get('/SGDH/articles/new', (req, res) => {
    res.render('SGDH/new', {article: new Article() });
});

routerSGDH.get('/SGDH/articles/:id', async (req, res) => {
    // const id = req.params.id,
    //    findArticle = await articles.find((x) => x.id === id);
    
    // const renderArticle = {
    //     title: findArticle.title,
    //     img: findArticle.img,
    //     imgTemp: findArticle.imgTemplate,
    //     description: findArticle.description,
    //     article: findArticle.article
    // }
    
    // res.render('SGDH/articleEdit', {renderArticle});

    const article = await Article.findById(req.params.id);
    if (article == null) res.redirect('SGDH/articles');
    res.render('blog-articles/show', { article: article });
});

module.exports = routerSGDH;