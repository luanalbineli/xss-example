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
    },
    {
        description: 'Hi, this is a fourth comment!<script>alert("Alive!");</script>'
    }
);

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(request, response, next) {
    var cookie = request.cookies.user_session;
    if (cookie === undefined) {
        response.cookie('user_session', new Date().getTime(), { maxAge: 900000, httpOnly: false });
        console.log('cookie created successfully');
    } else {
        console.log('cookie already exists');
    }
    next();
});

app.get('/', function (request, response) {
    response.render('index_pug', { pageTitle: 'Blog', comments: comments });
});

app.get('/api/comment', function (request, response) {
    response.json(comments);
});

app.post('/api/comment', function(request, response) {
   console.log(request.body);

   response.json(comments);
});

app.listen(8000);

console.log('Listening on 8000 port with ' + comments.length + ' comments.');