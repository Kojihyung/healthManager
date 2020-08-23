var express = require('express');
var app = express();
var router = require('./routes/router')(app);

app.set('views', __dirname + '/views/post');
app.set('view engine', 'ejs');

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});