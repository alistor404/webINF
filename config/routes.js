var User=require("../mongoose_db/Model/user.js")
var sina=require("../mongoose_db/Model/sinaSport.js")
var sinadetail=require("../mongoose_db/Model/sinadetail.js")




module.exports= function(app){

	app.use(function(req,res,next){
		if(!req.session.user && !req.originalUrl.match('/login')){
			res.redirect('/login')
		}
		next()
	})
	
	app.get('/',function(req,res){
		res.redirect('/index');
	})

	//index
	app.get('/index',function(req,res){
		if(!req.query.Index ){
		//page2初始内容拉取5个新闻
			sina.find({}).sort({'_id':-1}).limit(5).exec(function(err,sina){
				if(err){
					console.log(err)
				}else{
					var newsCont=[];
					for(var i=0;i<5;i++){
						var news={
							title:'',
							src:'',
							href:'',
							time:''
						}
						news.title=sina[i].title;
						news.src=sina[i].src;
						news.id=sina[i]._id;
						news.time=sina[i].createTime;
						newsCont.push(news);
					};
					res.render('index',{
						title:req.session.user,
						content:newsCont
					})
				}
			})
		}else{
			var lastindex=parseInt(req.query.Index);
			var newsCont=[];
			sina.find({}).sort({'_id':-1}).limit(lastindex+5).exec(function(err,sinas){
				if(err){
					console.log(err)
				}else{
					
					for(var i=lastindex;i<lastindex+5;i++){
						var news={
							title:'',
							src:'',
							href:'',
							time:''
						}
						news.href=sinas[i].href;
						news.title=sinas[i].title;
						news.src=sinas[i].src;
						news.id=sinas[i]._id;
						news.time=sinas[i].createTime;
						newsCont.push(news);
						
					};
					console.log(newsCont)
					res.send(newsCont)
				}
			})
		}
	})


	//page2 news detail
	app.get('/news/:id',function(req,res){
		var _newsid=req.params.id;
		var _id=_newsid.substring(1,_newsid.length-1)
		
		sinadetail.findOne({newsId:_id},function(err,newsdetail){
			if(err){console.log(err)}else{
				res.send(newsdetail);
			}
		})
		
	})

	//login
	app.get("/login",function(req,res){
		res.render('pages/login.pug',{
			title:'login'
		})
	})

	//login session
	app.post('/login',function(req,res){
		var _username=req.body.username;
		var _password=req.body.password ? req.body.password : "";
		var _phonenum=req.body.phonenum;
		var _checknum=req.body.checknum ? req.body.checknum :"";
		
		if(req.body.logintype=="checkmsg"){
			User.find({username:_username},function(err,userdetail){
				if(err){
					console.log(err)
				}
				if(!!userdetail.length){
					res.send({loginStatus:'4',msg:"糟糕，用户名被注册了"})
				}else{
					User.find({phonenum:_phonenum},function(err,userdetail){
						if(err){
							console.log(err)
						}
						if(!!userdetail.length){
							res.send({loginStatus:'5',msg:"糟糕，电话被注册了"})
						}else{
							if(req.session.phonenum==_phonenum){
								req.session.checkTime++
								if(req.session.checkTime>4){
									res.send({loginStatus:'0',msg:"请5分钟后再试"});
									res.end();
								}
							}else{
								req.session.phonenum=_phonenum;
								req.session.checkTime=0;
							};
							var checknum=alidayu(_phonenum);
							req.session.checknum=checknum;
							res.send({loginStatus:'1',msg:"已发送验证码"})
						}
					})
				}
			})
		}

		if(req.body.logintype=='login'){
			User.findOne({username:_username},function(err,userdetail){
				if(err){
					console.log(err)
				}
				if(!userdetail){
					res.send({loginStatus:'4',msg:"用户名输入错误"})
				}else{
					if(userdetail.password==_password){
					 	req.session.user=_username;
						res.send({loginStatus:'6',msg:"登陆成功"})
					}else{
						res.send({loginStatus:'7',msg:"密码输入错误"})
					}
				}
			})
		}

		if(req.body.logintype=='register'){
			User.find({username:_username},function(err,userdetail){
				if(err){
					console.log(err)
				}
				if(!!userdetail.length){
					res.send({loginStatus:'4',msg:"糟糕，用户名被注册了"})
				}else{
					User.find({phonenum:_phonenum},function(err,userdetail){
						if(err){
							console.log(err)
						}
						if(!!userdetail.length){
							res.send({loginStatus:'5',msg:"糟糕，电话被注册了"})
						}else{
							if(_checknum==req.session.checknum){
									var user=new User({
										username:_username,
									 	password:_password,
									 	phonenum:_phonenum
									})
									 user.save();//由实例加载save方法
									 req.session.user=_username;
									 res.send({loginStatus:'2',msg:"已成功注册，3s后跳转主页"})
							}else{
								res.send({loginStatus:'3',msg:"验证码输入不正确"})
							}
						}
					})
				}
			})
		}

		if(req.body.logintype=='forgetpassword'){
			User.findOne({username:_username},function(err,userdetail){
				if(err){
					console.log(err)
				}
				if(!userdetail){
					res.send({loginStatus:'4',msg:"用户名没有注册"})
				}else{
					if(userdetail.phonenum==_phonenum){
						var checknum=alidayu(_phonenum);
						req.session.checknum=checknum;
						res.send({loginStatus:'1',msg:"已发送验证码"})
					}else{
						res.send({loginStatus:'8',msg:"手机号码与账号不匹配"})
					}
				}
			})
		}

		if(req.body.logintype=='forgetcheck'){
			User.findOne({username:_username},function(err,userdetail){
				if(err){
					console.log(err)
				}
				if(!userdetail){
					res.send({loginStatus:'4',msg:"用户名没有注册"})
				}else{
					if(userdetail.phonenum==_phonenum){
						if(req.session.checknum=_checknum){
							req.session.user=_username
							res.send({loginStatus:'9',msg:"校验通过"})
						}else{
							res.send({loginStatus:'3',msg:"验证码输入不正确"})
						}
					}else{
						res.send({loginStatus:'8',msg:"手机号码与账号不匹配"})
					}
				}
			})
		}

		if(req.body.logintype=='password'){
			if(req.session.user){
				User.findOne({username:req.session.user},function(err,userdetail){
					userdetail.password=_password;
					userdetail.save(function(err){
						if(err){console.log(err),res.end()}
						res.send({loginStatus:'11',msg:"重置成功，3S后跳转首页"})
					});
				})
			}else{
				res.send({loginStatus:'10',msg:"糟糕，发生意外了"})
			}
		}
	})

	//page2
	// app.get()


}
//index
function alidayu(_phonenum){
	var random= Math.floor(Math.random()*10000)+"";

	
	var client = new TopClient({
	    'appkey': '23274823',
	    'appsecret': 'b3954647d6b44bf02b1602d3f3b499d4',
	    'REST_URL': 'http://gw.api.taobao.com/router/rest'
	});
	 
	client.execute('alibaba.aliqin.fc.sms.num.send', {
	    'extend':'123456',
	    'sms_type':'normal',
	    'sms_free_sign_name':'身份验证',
	    'sms_param':'{\"code\":\"'+random+'\",\"product\":\"Alistar\"}',
	    'rec_num':_phonenum,
	    'sms_template_code':'SMS_2625398'
	}, function(error, response) {
	    if (error)
	     console.log(error);
	})
	return random;
}
