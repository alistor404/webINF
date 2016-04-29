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

	// $.init();

})