var express =require('express') //引入express模块
var port=process.env.PORT || 80 //设置端口 前为环境变量
var app = express() //启动服务器

app.set("views","./views") //设置文本位置地址
app.set("view engine","pug") //设置视图引擎
app.listen(port) //监听端口
app.use(express.static('comment'));

console.log('this working!!')

//index
app.get('/',function(req,res){
	res.render('index',{
		title:'我的个人主页',
		header:'It working!!!'
	})
})