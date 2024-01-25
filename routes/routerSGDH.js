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
})

module.exports = routerSGDH;