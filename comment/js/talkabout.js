JQ(function(){

    // var imgArray=[];

    function eventlenth(){
        JQ('.append_commit #localImag input').change(function(){
            console.log(1)
            setImagePreview($(this))
        })
    }
    eventlenth();
	function setImagePreview(thisIndex) {
        var docObj=document.getElementById("inputMypic");
        if(window.URL.createObjectURL(docObj.files[0])){
            var time=new Date();
            var oldlabel=thisIndex.siblings('label').eq(0);
            var img = new Image();
            img.src = window.URL.createObjectURL(docObj.files[0]);
            console.log(window.URL.createObjectURL(docObj.files[1]))
            console.log(img.src)
            var div='<div style="height:100%;width:100%"></div>'
            var $append="<div class='col-33 imgBOX'><label for='"+time+"'><span class='icon icon-picture'></label><input name='"+time+"' type='file' multiple='mutiple' id='"+time+"' style='display:none' /></div>"

            // thisIndex.attr('id','');
            // thisIndex.attr('name','pic'+time);
            oldlabel.attr('for','#');
            oldlabel.empty();
            oldlabel.addClass('create-actions');
            oldlabel.append(div);
            oldlabel.find('div').css({'backgroundImage':"url("+img.src+")",'backgroundSize':'100% 100%'});
            
            $('#localImag').append($append);
            $('.imgBOX').height($('.imgBOX').width())


            eventlenth()
        }else{
            return false;
        }
    }

    $(document).on('click','.create-actions', function () {
      var img=$(this);
      // var Index;
      // var imgs=document.getElementsByClassName("imgBOX");
      // for(var i=0;i<imgs.length;i++){
      //   if(this==imgs[i]){
      //       Index=i;
      //   }
      // }
      var buttons1 = [
        {
          text: '请选择',
          label: true
        },
        {
          text: '删除',
          bold: true,
          color: 'danger',
          onClick: function() {
            img.parent().remove();
          }
        }
      ];
      var buttons2 = [
        {
          text: '取消',
          bg: 'danger'
        }
      ];
      var groups = [buttons1, buttons2];
      $.actions(groups);
  });

})