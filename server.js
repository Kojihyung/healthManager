var express = require('express');
var app = express();
const router = require('./routes/router');
var bodyParser = require('body-parser');
var path = require('path');

const {sequelize,DB_INFO} = require("./util/database");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const store = new MySQLStore(DB_INFO);

const Member = require("./models/member");

app.use(
    session({
      secret: "dplandplan",
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );

  app.use(express.static(__dirname + '/public'));

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
    app.listen(3000);
  })
  .then(err => console.log(err));
