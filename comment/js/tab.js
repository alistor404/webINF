JQ(function(){
  //tab1.pug 图片居中显示
  window.onload=function(){
    $('.imgbox').each(function(){
      $(this).height($(this).width());
      var pich=$(this).find('img').height();
      var picw=$(this).find('img').width();
      if(pich<picw){
        $(this).find('img').height('100%');
        $(this).find('img').width('auto');
        var left=$(this).find('img').height()-$(this).find('img').width();
        $(this).find('img').css({'position':'relative','left':left/2})
      }else if(pich>picw){
        $(this).find('img').width('100%');
        $(this).find('img').height('auto');
        var top=$(this).find('img').width()-$(this).find('img').height();
        $(this).find('img').css({'position':'relative','top':top/2})
      }
    })
  }

  //搜索页面
  $('.search_button').click(function(){
    if($('#users li')){
      $('#users li').detach()
    }
    $.ajax({
      url:'/search',
      type:'post',
      data:{
        keyword:$('.header_search_input').val()
      },
      success:function(ret){
        for(var i in ret){
          var li='<li class="item-content"><div class="item-media"><img class="userheader" src="'+ret[i].headerpic+'" width="34" height="34"><input type="hidden" value="'+ret[i].username+'"></div><div class="item-inner"><div class="item-title">'+ret[i].nicename+'</div><div class="item-after"><span class="icon icon-right userheader"></span><input type="hidden" value="'+ret[i].username+'"></div></div></li>'
          $('#users ul').append(li);
        }
        $('#users .userheader').click(function(){
          frienddetail($(this));
        })
      }
    })
    $.router.load("#searchpage")
  })

  //tab2.pug
	var loading = false;
      // 最多可加载的条目
  var maxItems = 50;

  // 每次加载添加多少条目
  var itemsPerLoad = 5;

	function addItems(lastIndex) {
	      // 生成新条目的HTML
	     JQ.ajax({
	     	url:'/news/newsCont',
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




      //headerpic change
      $('#headerpic').change(function(){
        $('#headpic').submit();
        $.toast("修改成功");
        thisIndex=document.getElementById('headerpic');
        console.log(window.URL.createObjectURL(thisIndex.files[0]))
        $('.myheaderpic').attr('src',window.URL.createObjectURL(thisIndex.files[0]));
      })




      //好友详情页
      $('.userheader').click(function(){
          frienddetail($(this));
      })

      function frienddetail($this){
        $.ajax({
          url:'/user/getmsg',
          type:'post',
          data:{username:$this.siblings('input').val()},
          success:function(ret){
            $('.userdetail').find('.userheaderpic').attr('src',ret.headerpic)
            $('.userdetail').find('.username').text(ret.username)
            $('.userdetail').find('.nicename').text(ret.nicename)
            $('.userdetail').find('.phonenum').text(ret.phonenum)
            $('.userdetail').find('.sexy').text(ret.sexy? '男生':"女生")
            $('.userdetail').find('.sign').text(ret.sign)
            $('.userdetail').find('.brithday').text(ret.brithday)
          }
        })
        $.popup('.userdetail')
      }

      //加好友
      $('.userdetail .append_concems').click(function(){
        var username=$('.userdetail .username').text();
        console.log(username)
        $.ajax({
          url:'/user/appendconcems',
          type:'post',
          data:{
            username:username
          },
          success:function(ret){
            if(ret.friendstatus==1){
              $.toast("添加成功");
            }else if(ret.friendstatus==0){
              $.toast("已经是好友哦");
            }
          }
        })
      })

      //图片浏览
     $(document).on("click", ".pb-standalone-captions", function(){
        $.showIndicator();
        var news_id=JQ(this).find('input').val();
        
        JQ.ajax({
          url:'/news/'+news_id,
          type:'get',
          success:function(data){
            if(!data || data.stutas=='false'){
                console.log('出错了')
                $.hideIndicator();
                $.toast('加载出错')
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
              var myPhotoBrowserCaptions = new $.photoBrowser({
                photos : Parray,
                theme: 'dark',
                type: 'standalone'
              });
              $.hideIndicator();
              myPhotoBrowserCaptions.open();
              $.init()
            }
          }
        })
        
      })


      //好友动态图片浏览
      $(document).on("click", ".mystatus_picture", function(){
        var photosarray=[];
        var allimg=$(this).parent().parent().find('img');
        var picIndex=0;
        for(var i in allimg){
          photosarray.push(allimg.eq(i).attr('src'));
          if($(this).attr('src')==allimg.eq(i).attr('src')){
            picIndex=i;
          }
        }
        var myPhotoBrowserStandalone = $.photoBrowser({
            photos : photosarray
        });
        $.hideIndicator();
        myPhotoBrowserStandalone.open(picIndex);
        $.init() //重新配置init防止 冲突
        
      })


	
	

	
})