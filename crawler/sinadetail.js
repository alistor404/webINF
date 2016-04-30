var http= require("http");
var cheerio=require('cheerio')
var mongoose = require('mongoose');
var Sinadetail=require("../mongoose_db/Model/sinadetail.js")
var sinadetail={
	sinadetail:function(url,id){
		http.get(url,function(res){
	 	var html =''
	 	var _id=id;
	 	res.on('data',function(data){
	 		html+=data
	 		})
	 		.on('end',function(){
	 			htmlChapters(html,id)
	 		})
		}).on('error',function(err){
		console.log('获取数据出错')
		console.log(err)
		})
	}
}


function htmlChapters(html,_newsId){
	var $ =cheerio.load(html)
	var _maintitle=$('title').text();
	var _sinadetail={
		maintitle:_maintitle,
		newsId:_newsId,
		title:[],
		msg:[],
		src:[]
	}
	var chapters=$('.j_slide');
	for(var i in chapters){
		var _src=chapters.eq(i).find('img').attr('data-src')
		var _msg=chapters.eq(i).find("img").attr('alt')
		var _title=chapters.eq(i).find("img").attr('data-title')
		if(_src){
			_sinadetail.title.push(_title);
			_sinadetail.msg.push(_msg);
			_sinadetail.src.push(_src);
		}

	}

	var sinadetail=new Sinadetail({
		maintitle:_sinadetail.maintitle,
		newsId:_sinadetail.newsId,
		title:_sinadetail.title,
		src:_sinadetail.src,
		msg:_sinadetail.msg
	})
	sinadetail.save();
	
}


module.exports = sinadetail;