JQ(function(){

   $('#submittype').click(function(){
    if($('.hiddenform').css('display')=='block'){
      if($('.hiddenform input').val()!=''){
        $('#formFile').submit();
        $.closeModal('.append_commit')
      }else{
        $.toast("发表为活动必须补全信息哦");
      }
    }else{
      var buttons1 = [
        {
          text: '请选择',
          label: true
        },
        {
          text: '发表为状态',
          bold: true,
          onClick: function() {
            $('.hiddenform input').val('');
            $('#formFile').submit();
            
          }
        },
        {
          text: '发表为活动',
          bold: true,
          onClick: function() {
            $('.hiddenform').show()
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
    }
  })

  $("#city-picker").cityPicker({
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker">确定</button>\
    <h1 class="title">选择活动举办地点</h1>\
    </header>'
  });

  $('#datecheck').calendar({
    value: ['2016-01-01']
  });

  function eventlenth(){
      JQ('.append_commit #localImag input').change(function(){
          setImagePreview(this)
      })
  }

  eventlenth();

	function setImagePreview(thisIndex) {
        if(window.URL.createObjectURL(thisIndex.files[0])){
            var time=new Date();
            var oldlabel=$(thisIndex).siblings('label').eq(0);
            var img = new Image();
            img.src = window.URL.createObjectURL(thisIndex.files[0]);
            var div='<div style="height:100%;width:100%"></div>'
            var $append="<div class='col-33 imgBOX'><label for='"+time+"'><span class='icon icon-picture'></label><input name='"+time+"' type='file' multiple='mutiple' id='"+time+"' style='display:none' /></div>"

            oldlabel.attr('for','#');
            oldlabel.empty();
            oldlabel.addClass('create-actions');
            oldlabel.append(div);
            oldlabel.find('div').css({'backgroundImage':"url("+img.src+")",'backgroundSize':'100% 100%'});
            
            $('#localImag').prepend($append);
            $('.imgBOX').height($('.imgBOX').width())


            eventlenth()
        }else{
            return false;
        }
    }

    $(document).on('click','.create-actions', function () {
      var img=$(this);
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