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
        frienddetail();
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
  var lastIndex = 5;

	function tab2addItems(lastIndex) {
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
	     			for(var i=0;i<ret.length;i++){
						var html='<div class="card demo-card-header-pic pb-standalone-captions tap2_card"><input type="hidden" value="'+ret[i].id+'"><div valign="bottom" class="card-header color-white no-border no-padding"><img class="card-cover" src="'+ret[i].src+'" alt="'+ret[i].title+'"></div><div class="card-content"><div class="card-content-inner"><p>'+ret[i].title+'</p><p class="color-gray">发表于 '+ret[i].createTime+'</p></div></div><div class="card-footer"><a href="#" class="link">赞</a><a href="#" class="link">更多</a></div></div>';
	     				$('.card_group').append(html);
	     			}
     				
	     		}
	     	}
	     })

	    
	}

      
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
              tab2addItems(lastIndex);
              // 更新最后加载的序号
              lastIndex = $('.tap2_card').length;
	              //容器发生改变,如果是js滚动，需要刷新滚动
	          $.refreshScroller();
          }, 1000);
       })

      //tab1 条目
      var tab1lastIndex = 5;
      function tab1addItems(lastIndex) {
        // 生成新条目的HTML
       JQ.ajax({
        url:'/user/stutaslist',
        type:'get',
        data:{
          Index:lastIndex
        },
        success:function(ret){
          if(!ret){
            return false
            console.log(err)
          }else{
            for(var i=0;i<ret.length;i++){
              var $html='<div class="card facebook-card tab1_card"><div class="card-header no-border"><div class="facebook-avatar"><img class="userheader" src="'+ret[i].concems.headerpic+'" width="34" height="34"><input type="hidden" value="'+ret[i].concems.username+'"></div><div class="facebook-name">'+ret[i].concems.nicename+'</div><div class="facebook-date">'+ret[i].status.content.createTime+'</div></div><div class="card-content card_img_'+ret[i].status.content.pic.length+'"></div><div class="card-footer no-border"><a class="link" href="#">赞</a><a class="open-popup" href="#" data-popup=".append_talks">评论</a><a class="link" href="#">分享</a></div></div>';
              for(var n in ret[i].status.content.pic){
                var src=ret[i].status.content.pic[n];
                var $pic='<div class="imgbox"><p>&nbsp;&nbsp;'+ret[i].status.content.text+'</p><img class="mystatus_picture" src="'+src+'" width="100%" height="auto"></div>';
                console.log($($html))
                $($html).find('.card-content').append($($pic));
              }
              $('#tab1').append($($html));
            }
          }
        }
       })

      
      }

      
      $('#tab1').on('infinite',function() {
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
              tab1addItems(tab1lastIndex);
              // 更新最后加载的序号
              tab1lastIndex = $('.tab1_card').length;
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

      function frienddetail(){
        $('.userheader').click(function(){
          $.ajax({
            url:'/user/getmsg',
            type:'post',
            data:{username:$(this).siblings('input').val()},
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
          location.href='#userdetail'
        })
      }
      frienddetail();
      //关闭userdetail
      $('.userdetail_back').click(function(){
        $.closeModal('.userdetail')
      })

      //加好友
      $('.userdetail .append_concems').click(function(){
        var username=$('.userdetail .username').text();
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


      //好友评论页打开
        var statusID='';
        var concems='';
       $('.status_comment').click(function(){
          if(statusID==$(this).next('input').val()){
            $.popup('.append_talks')
            return false
          }else{
            statusID=$(this).next('input').val();
            concems=$(this).parent().parent().find('.concems_username').val();
            var userheader=$(this).parent().parent().find('.userheader').attr('src')
            var text=$(this).parent().parent().find('.card-content').find('p').text();
            var statusimg=$(this).parent().parent().find('.card-content').find('img');
            var commitTime=$(this).parent().parent().find('.facebook-date').text();
            $('.append_talks .comment_card_main .userheader').attr("src",userheader);
            $('.append_talks .comment_card_main .concems_username').val(concems);
            $('.append_talks .comment_card_main .facebook-name').text(text);
            $('.append_talks .comment_card_main .facebook-date').text(commitTime);
            if(statusimg){
              for(var i=0;i<statusimg.length;i++){
                var imgbox='<div class="swiper-slide"><img src="'+statusimg.eq(i).attr('src')+'"/></div>'
                $('.swiper-wrapper').append(imgbox);  
              }
            }
            JQ.ajax({
              url:'/status/getcommit',
              type:"post",
              data:{
                statusID:statusID,
                concems:concems
              },
              success:function(ret){
                if(!ret){
                  $.toast("520之前的说说无法评论哦");
                }
                for(var i in ret.comment){
                  for(var n in ret.users){
                    if(ret.users[n].username==ret.comment[i].username){
                      var myheaderpic=ret.users[n].headerpic;
                      var myusername=ret.comment[i].username;
                      var text=ret.comment[i].text;
                      var time=ret.comment[i].createTime;
                      var commit='<div class="card facebook-card comment_card"><div class="card-header no-border"><div class="facebook-avatar"><img class="userheader" src="'+myheaderpic+'" width="34" height="34"><input class="mycommit" type="hidden" value="'+myusername+'"></div><div class="facebook-name">'+text+'</div><div class="facebook-date">'+time+'</div></div></div>'
                      $('.append_talks .list').append(commit);
                      break;
                    }
                  }
                }
              }
            })
            $.popup('.append_talks')
            $(".swiper-container").swiper();
            JQ(".append_commit_botton").show()
          }
       })


       //评论入口开关
       var commit_status=0;
       $('.append_or_close').click(function(){
          if(commit_status==0){
            $(this).parent().parent().css({"width":"100%","right":"0"})
            $(this).css('transform','rotate(45deg)')
            commit_status=1;
          }else{
            $(this).parent().parent().css({"width":"1.5rem","right":"1.5rem"})
            $(this).css('transform','rotate(0deg)')
            commit_status=0;
          }
       })
       //点赞
       $('.status_zan').click(function(){
          statusID=$(this).siblings('input').val();
          concems=$(this).parent().parent().find('.concems_username').val();
          var old=parseInt($(this).text().substring(2));
          $(this).text('赞('+eval(old+1)+')')
          $.ajax({
            url:'/status/postcommit',
            type:'post',
            data:{
              statusID:statusID,
              concems:concems,
              zan:'1'
            },
            success:function(ret){
              if(!!ret.a){
                $.toast("你已经点过赞了哦");
              }
            }
          })
       })

       //评论
        $('.text_submit').click(function(){
          var text=$('.append_commit_botton input').val();
          if(text==''){
            $('.append_or_close').parent().parent().css({"width":"1.5rem","right":"1.5rem"})
            $('.append_or_close').css('transform','rotate(0deg)')
            commit_status=0;
          }else{
            //前端页面添加
            var myheaderpic=$('.myheaderpic').eq(0).attr('src');
            var mynicename=$('.porsen_name').text();
            var date=new Date;
            var time=date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            var commit='<div class="card facebook-card comment_card"><div class="card-header no-border"><div class="facebook-avatar"><img class="userheader" src="'+myheaderpic+'" width="34" height="34"><input class="mycommit" type="hidden" value="'+mynicename+'"></div><div class="facebook-name">'+text+'</div><div class="facebook-date">'+time+'</div></div></div>'
            $('.append_talks .list').append(commit);
            $('.append_or_close').parent().parent().css({"width":"1.5rem","right":"1.5rem"})
            $('.append_or_close').css('transform','rotate(0deg)')
            commit_status=0;
            //后台添加
            $.ajax({
              url:'/status/postcommit',
              type:'post',
              data:{
                statusID:statusID,
                concems:concems,
                text:text,
                createTime:time
              },
              success:function(ret){

              }
            })
          }
        })
       //关闭评论页
       $('.popup_down').click(function(){
          $(".append_commit_botton").hide() 
       })




	     

	
})