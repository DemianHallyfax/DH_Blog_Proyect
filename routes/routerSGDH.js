const express = require('express'),
    app = express();
    routerSGDH = express.Router();

app.use(express.static(__dirname + '/public'));
app.use('/public', express.static('public'));

routerSGDH.get('/SGDH/lobby', (req, res) => {
    res.render('SGDH');
});

module.exports = routerSGDH;