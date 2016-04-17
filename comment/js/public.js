$(function(){
	//切换TAB时切换背景图片
	$('.header_nav a').click(function(){
		$('.header_nav a').each(function(){
			var	ald=$(this).find('img').attr('src')+'';
			if(!ald.match('_')){
				$(this).find('img').attr('src',ald.replace(".png","_gray.png"));
			}
		})
		var	old=$(this).find('img').attr('src');
		if(old.match('_')){
			$(this).find('img').attr('src',old.substring(0,9)+".png");
		}
	})
})