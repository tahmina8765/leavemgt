var express = require('express'),
    api     = require('./api'),
    users   = require('./users'),
    app     = express();

app
    .use(express.static('./public'))
    .use(users)
    .use('/api', api)
    .get('*', function (req, res) {
        if (!req.user) {
            res.redirect('/login');
        } else {
            res.sendFile(__dirname + '/public/main.html');
        }
    })
    .listen(3000);
