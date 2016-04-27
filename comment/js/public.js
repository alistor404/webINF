JQ(function(){
	//切换TAB时切换背景图片
	JQ('.header_nav a').click(function(){
		JQ('.header_nav a').each(function(){
			var	ald=JQ(this).find('img').attr('src')+'';
			if(!ald.match('_')){
				JQ(this).find('img').attr('src',ald.replace(".png","_gray.png"));
			}
		})
		var	old=JQ(this).find('img').attr('src');
		if(old.match('_')){
			JQ(this).find('img').attr('src',old.substring(0,9)+".png");
		}
	})


	
	

	
	$(document).on("click", ".pb-standalone-captions", function(){

		var news_id=JQ(this).find('input').val();
		
		JQ.ajax({
			url:'/news/'+news_id,
			type:'get',
			success:function(data){
				if(!data){
					console.log('出错了')
				}else{
					var Parray=[];
					for(var i=0;i<data.src.length;i++){
						var news={
							url:'',
							caption:''
						}
						news.url=data.src[i];
						news.caption=data.title[i];
						Parray.push(news);
					}
					var myPhotoBrowserCaptions = $.photoBrowser({
						photos : Parray,
						theme: 'dark',
						type: 'standalone'
					});
					console.log(myPhotoBrowserCaptions.photos)
					myPhotoBrowserCaptions.open();
				}
			}
		})
		
	})
	
})