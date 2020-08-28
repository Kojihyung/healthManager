var express = require('express');
var app = express();
var server = require('http').createServer(app);
const router = require('./routes/router');
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
const basicController = require('./controllers/basic');
const request = require('request');

const { sequelize, DB_INFO } = require("./util/database");
const session = require("express-session");
//const Member = require('./models/Member');
//const BodyInfo = require('./models/bodyInfo');
//const Day = require('./models/attendedDay');
const MySQLStore = require("express-mysql-session")(session);

const store = new MySQLStore(DB_INFO);

const path = require('path');
const { render } = require('ejs');

app.use(
  session({
    secret: "dplandplan",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(express.static(__dirname + '/public'));

app.use('/public', express.static('public'));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

// dirname 뒤가 views와 관련된 디렉토리 주소
// 예를 들어 dirname + '/views/post' 하면 view와 관련된게 다 post 위치로 잡히더라
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// 익스프레스 미들웨어 중 하나
// req.body의 header와 body를 읽을 수 있게 도와줌 아무튼 html 통신을 도와주는 중간자
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(router);

sequelize
  .sync()
  .then(() => {
    server.listen(3000, function () {
      console.log('Socket IO server listening on port 3000');
    });
    io.on('connection', function (socket) {
      socket.on('clicked', function (data) {
        console.log("reload");
      });
    })
  })
  .then(err => console.log(err));
