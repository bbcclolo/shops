$(function(){
	$('#regist').on('click',function(){
		if(!$('#username').val()){
			alert('用户名不能为空')
			return false;
		}
		if(!$('#password').val()){
			alert('密码不能为空')
			return false;
		}
		var data = $('form').serialize();
		$.ajax({
			type:"post",
			url:"/user/regist",
			data:data,
			success:function(data){
				if(data.status === 'error'){
					alert('用户名已存在，请重新输入！')
				}else{
					location.href="/user/login"
				}
			}
		});
	})
})
