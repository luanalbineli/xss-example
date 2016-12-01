var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    pug = require('pug'),
    app = express(),
    comments = [];

comments.push(
    {
        description: 'Hi, this is a comment!'
    },
    {
        description: 'Hi, this is a second comment!'
    },
    {
        description: 'Hi, this is a third comment!'
    }
);

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(request, response, next) {
    var cookie = request.cookies.user_session;
    if (cookie === undefined) {
        response.cookie('user_session', new Date().getTime(), { maxAge: 900000, httpOnly: false });
    }
    next();
});

app.get('/', function (request, response) {
    response.render('index_pug', { pageTitle: 'Blog', comments: comments });
});

app.post('/', function (request, response) {
    comments.push({
       description: request.body.comment
    });
    response.render('index_pug', { pageTitle: 'Blog', comments: comments });
});

app.listen(8000);

console.log('Listening on 8000 port with ' + comments.length + ' comments.');