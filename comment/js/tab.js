JQ(function(){
  //tab2.pug
	var loading = false;
      // 最多可加载的条目
      var maxItems = 50;

      // 每次加载添加多少条目
      var itemsPerLoad = 5;

	function addItems(lastIndex) {
	      // 生成新条目的HTML
	     JQ.ajax({
	     	url:'',
	     	type:'get',
	     	data:{
	     		Index:lastIndex
	     	},
	     	success:function(ret){
	     		if(!ret){
	     			return false
	     			console.log(err)
	     		}else{
	     			console.log(ret.length)
	     			for(var i=0;i<ret.length;i++){
	     				console
						var html='<div class="card demo-card-header-pic pb-standalone-captions tap2_card"><input type="hidden" value="'+ret[i].id+'"><div valign="bottom" class="card-header color-white no-border no-padding"><img class="card-cover" src="'+ret[i].src+'" alt="'+ret[i].title+'"></div><div class="card-content"><div class="card-content-inner"><p>'+ret[i].title+'</p><p class="color-gray">发表于 '+ret[i].createTime+'</p></div></div><div class="card-footer"><a href="#" class="link">赞</a><a href="#" class="link">更多</a></div></div>';
	     				$('.card_group').append(html);
	     			}
     				
	     		}
	     	}
	     })

	    
	}

      var lastIndex = 5;
      $('#tab2').on('infinite',function() {
          // 如果正在加载，则退出
          if (loading) return;

          // 设置flag
          loading = true;

          // 模拟1s的加载过程
          setTimeout(function() {
              // 重置加载flag
              loading = false;

              if (lastIndex >= maxItems) {
                  // 加载完毕，则注销无限加载事件，以防不必要的加载
                  $.detachInfiniteScroll($('.infinite-scroll'));
                  // 删除加载提示符
                  $('.infinite-scroll-preloader').remove();
                  return;
              }

              // 添加新条目
              addItems(lastIndex);
              // 更新最后加载的序号
              lastIndex = $('.tap2_card').length;
	              //容器发生改变,如果是js滚动，需要刷新滚动
	          $.refreshScroller();
          }, 1000);
       })



     $.init()



    //mydetail.pug
     $("#dateChoose").datetimePicker({});

     $("#mydetailup").click(function(){
        var obj={
          nicename:'',
          sexy:'',
          brithday:'',
          sign:'',
          visible:''
        }
        var Input=$('#Mydetail').find('[name]');
        for(var i=0;i<Input.length;i++){
          obj[Input.eq(i).attr('name')]=Input.eq(i).val()
        }
        
        $.showPreloader('更新中')
        JQ.ajax({
          url:'/user/detail',
          type:'post',
          data:obj,
          success:function(ret){
            if(ret=='success'){
              $.hidePreloader();
              $.toast("操作成功");
            }else{
              console.log(ret)
              $.toast("操作失败");
            }
          }
        })
      })













	
	

	
})