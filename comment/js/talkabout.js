JQ(function(){

    var imgArray=[];

    JQ('.append_commit #inputMypic').change(function(){
        setImagePreview()
    })
	function setImagePreview() {
        var localImag=document.getElementById("localImag");
        var docObj=document.getElementById("inputMypic");
        if(window.URL.createObjectURL(docObj.files[0])){
            imgArray.push(docObj.value);
            var imgBOX=document.createElement("div");
            imgBOX.className='col-33 imgBOX create-actions';
            var img = new Image(); img.src = window.URL.createObjectURL(docObj.files[0]);
            imgBOX.style.backgroundImage ="url("+img.src+")";
            imgBOX.style.backgroundSize='100% 100%'
            localImag.appendChild(imgBOX);
            $('.imgBOX').height($('.imgBOX').width())
            docObj.value='';
        }else{
            return false;
        }
    }

    $(document).on('click','.create-actions', function () {
      var img=$(this);
      var Index;
      var imgs=document.getElementsByClassName("imgBOX");
      for(var i=0;i<imgs.length;i++){
        if(this==imgs[i]){
            Index=i;
        }
      }
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
            img.remove();
            delete imgArray[Index];
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