var http= require("http");
var cheerio=require('cheerio')
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1/sport'); 
var Sina=require("../mongoose_db/Model/sinaSport.js")

var url ="http://sports.sina.cn/?vt=4&pos=108"

http.get(url,function(res){
 	var html =''
 	res.on('data',function(data){
 		html+=data
 		})
 		.on('end',function(){
 			htmlChapters(html);
 		})
}).on('error',function(err){
	console.log('获取数据出错')
	console.log(err)
})

function htmlChapters(html){
	var $ =cheerio.load(html)
	var chapters=$('.swipe_pic a')
	for(var i in chapters){
		if(chapters.eq(i).find('img').attr('alt')){
			var _href=chapters.eq(i).attr('href')
			var _title=chapters.eq(i).find('img').attr('alt')
			console.log(_title)
			var _src=chapters.eq(i).find('img').attr('src')
			var sina=new Sina({
				title:_title,
				href:_href,
				src:_src
			})
			sina.save();
		}
	}
}