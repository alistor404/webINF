var express =require('express') //引入express模块
var mongoose = require('mongoose');    //引用mongoose模块
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); //如果要使用cookie，需要显式包含这个模块
var session = require('express-session'); //如果要使用session，需要单独包含这个模块
var fs=require('fs');
TopClient = require('./msgcheck/topClient.js').TopClient;//阿里大鱼
var port=process.env.PORT || 80 //设置端口 前为环境变量
var app = express() //启动服务器

// var server = require('http').createServer(app);
// var io = require('socket.io')(server);//将socket挂载为express服务

var db = mongoose.connect('mongodb://127.0.0.1/sport'); //创建一个数据库连接

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());//ajax post是个坑 中间件支持

app.use(cookieParser());
app.use(session({
 	httpOnly: true,
 	resave:false,
  	saveUninitialized:false,
	secret:'Alistar'
}));//session支持

app.set("views","./views") //设置文本位置地址
app.set("view engine","pug") //设置视图引擎
app.listen(port) //监听端口
app.use(express.static('comment'));//设置静态资源位置


require('./config/routes.js')(app);//引用route配置 传入服务

console.log('this working!!')



