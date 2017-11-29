$(function(){
	
	$('#login').on('click',function(){
		if(!$('#username').val()){
			alert('用户名不能为空!')
			return false;
		}
		if(!$('#password').val()){
			alert('密码不能为空!')
			return false;
		}
		
		var data = $('#form').serialize();
		
		$.ajax({
			type:"post",
			url:"/user/login",
			data:data,
			success:function(data){
				if(data.status === 'error'){
					alert('该用户名未注册！')
					$('#username').focus()
				}else if(data.success === 'error'){
					alert('密码错误！')
					$('#password').focus()
				}else if(data.success === 'success'){
					location.href = '/'
				}
			}
		});
	})
})
window.onload = function(){
	var search = location.search.replace('?',"").split('=')[1];
	if(search === '0'){
		alert('请先登录！')
	}
}
