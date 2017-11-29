$(function(){
	var username;
	var cookies = document.cookie.split(";");
	for(var i=0;i<cookies.length;i++){
		if(cookies[i].indexOf('username') > -1){
			username = cookies[i].split('=')[1];
		}
	}
	if(username){
		$('#haveUser').show()
		$('#haveUser .username').html(username)
		$('#noUser').hide()
	}else{
		$('#haveUser').hide()
		$('#noUser').show()
	}
	
	$('#haveUser a').on('click',function(){
		$.ajax({
			type:"post",
			url:"/user/logout",
			success:function(data){
				if(data.status === 'success'){
					console.log('删除成功')
					console.log(document.cookie)
					$('#haveUser').hide()
					$('#noUser').show()
					location.href="/";
				}
			}
		});
	})
	
})
	
