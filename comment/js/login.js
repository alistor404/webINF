$(function(){
	$("#but1").click(function(){
		var username=$('#tab1 input[type="text"]').val();
		var password=$('#tab1 input[type="password"]').val();
		var errormsg=usernamecheck(username) ? usernamecheck(username) : passwordcheck(password);
		if(errormsg.length>0){
			$("#tab1 .login_errormsg p").text(errormsg)
		}else{
			$.ajax({
				url:'/login',
				type:'post',
				datatype:"json",
				data:{
					logintype:'login',
					username:username,
					password:password
				},
				success:function(ret){
					if(!ret){
					$("#tab1 .login_errormsg p").text("哎呀！发生意外了")
					}
					if(ret.loginStatus=="6"){
						$("#tab1 .login_errormsg p").text(ret.msg);
						location.href='/index';	
					}else{
						$("#tab1 .login_errormsg p").text(ret.msg)
					}
				}
			})
		}
	})
	$('#but2').click(function(){
		var username=$('#tab2 input[name="username"]').val();
		var password=$('#tab2 input[name="password"]').val();
		var reppassword=$('#tab2 input[name="reppassword"]').val();
		var phonenum=$('#tab2 input[name="phonenum"]').val();
		var checkcode=$('#tab2 input[name="checkcode"]').val();
		var errormsg=usernamecheck(username) ? usernamecheck(username) : passwordcheck(password);
		errormsg=errormsg ? errormsg : reppasswordcheck(password,reppassword);
		errormsg=errormsg ? errormsg : phonenumcheck(phonenum); 
		errormsg=errormsg ? errormsg : checkcodecheck(checkcode); 
		if(errormsg.length>0){
			$("#tab2 .login_errormsg p").text(errormsg)
		}else{
			$.ajax({
				url:'/login',
				type:'post',
				datatype:"json",
				data:{
					logintype:'register',
					username:username,
					password:password,
					phonenum:phonenum,
					checknum:checkcode
				},
				success:function(ret){
					if(!ret){
						$("#tab2 .login_errormsg p").text("哎呀！发生意外了")
					}
					if(ret.loginStatus=="2"){
						$("#tab2 .login_errormsg p").text(ret.msg);
						setTimeout(function(){
							location.href='/index';	
						},2000)
						
					}else{
						$("#tab2 .login_errormsg p").text(ret.msg)
					}
				}
			})
		}
	})
	$("#but3").click(function(){
		var username=$('#tab2 input[name="username"]').val();
		var password=$('#tab2 input[name="password"]').val();
		var reppassword=$('#tab2 input[name="reppassword"]').val();
		var phonenum=$('#tab2 input[name="phonenum"]').val();
		var errormsg=usernamecheck(username) ? usernamecheck(username) : passwordcheck(password);
		errormsg=errormsg ? errormsg : reppasswordcheck(password,reppassword);
		errormsg=errormsg ? errormsg : phonenumcheck(phonenum);
		if(errormsg.length>0){
			$("#tab2 .login_errormsg p").text(errormsg)
		}else{
			$.ajax({
				url:'/login',
				type:'post',
				datatype:"json",
				data:{
					logintype:'checkmsg',
					username:username,
					password:password,
					phonenum:phonenum
				},
				success:function(ret){
					if(!ret){
						$("#tab2 .login_errormsg p").text("哎呀！发生意外了")
					}else{
						$("#tab2 .login_errormsg p").text(ret.msg);
					}
				}
			})
			sendMsgAfter($(this));
		}
	})

})

function usernamecheck(username){
	var msg="";
	if(username==''){
		msg="请输入账号"
	}else if(username.length<2){
		msg="账号长度不能小于2位"
	}else if(username.match(" ")==" "){
		msg="账号不能包含空格"
	}
	return msg;
}

function passwordcheck(password){
	var msg="";
	if (password==""){
		msg="请输入密码"
	}else if(password.length<6){
		msg="密码长度不能小于6位"
	}
	return msg;
}

function cpcheck(username,password){
	var msg='';
	$.ajax({
		url:'localhost/login',
		type:'post',
		data:{
			'userName':username,
			'passWord':password
		},
		success:function(data){
			if(!data.length){
				msg='哎呀！发生意外了'
			}else if(data.statu==1){
				msg='登陆成功！'
			}else{
				msg=data.msg;
			}
			return msg;
		}
	})
}

function reppasswordcheck(password,reppassword){
	var msg="";
	if(password!=reppassword){
		msg='两次密码输入不相符！'
	}
	return msg;
}

function phonenumcheck(phonenum){
	var msg='';
	if(phonenum.length!=11 || phonenum[0]!=1){
		msg='请输如正确的手机号码'
	}
	return msg;
}

function checkcodecheck(checkcode){
	var msg="";
	if(checkcode.length!=4){
		msg="请输入6位验证码"
	}
	return msg;
}

function sendMsgAfter(ele){
	ele.attr("disabled","disabled");
	ele.val(30);
	a();
	function a(){
		setTimeout(function(){
			ele.val(ele.val()-1);
			if(ele.val()==0){
				ele.removeAttr("disabled");
				ele.val('获取验证码')
				return false;
			}else{
				a();
			}
		},1000);
	}
}