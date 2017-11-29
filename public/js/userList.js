
window.onload = function(){
	Array.prototype.customSort = function(str){
		this.sort(function (x, y) {
		    if (x[str] < y[str]) {
		        return -1;
		    }
		    if (x[str] > y[str]) {
		        return 1;
		    }
		    return 0;
		});
		return this;
	}
}



$(function(){
	var pathArr = location.pathname.split('/');
	var id = parseInt(pathArr[pathArr.length-1]);
	var lis = $('.pagination li');
	if(!id){
		id = 1;
	}
	if(id > lis.length-3){
		id = id-1;
		$('.pagination li:last-child').find('a').attr('href','/user/list/' + (id+1))
		$('.pagination li:first-child').find('a').attr('href','/user/list/' + id)
		return ;
	}else if(id <= 1){
		id = id + 1;
		$('.pagination li:last-child').find('a').attr('href','/user/list/' + id)
		$('.pagination li:first-child').find('a').attr('href','/user/list/' + (id-1))
		return;
	}
	$('.pagination li:last-child').find('a').attr('href','/user/list/' + (id+1))
	$('.pagination li:first-child').find('a').attr('href','/user/list/' + (id-1))
})

$(function(){
	
	$('.userList').on('click', '.choose', function(){
		var id = $(this).parents('tr').attr('id')
		var grade = parseInt($(this).siblings('input').val());
		var role = $(this).parents('tr').attr('role')
		var _this = $(this);
		if(grade == role || isNaN(grade) || grade < 0 || grade >= 100){
			return false;
		}
		
		var data = {
			id:id,
			role:grade
		}
		$.ajax({
			type:"post",
			url:"/user/list",
			data:data,
			success:function(data){
				if(data.status === 'success'){
					alert('修改成功！')
					$(this).siblings('input').val(grade)
					_this.parents('tr').find('td:nth-child(3)').html(updateGrade(grade))
				}
			}
		});
	})
	
	function updateGrade(role){
		if(role<=10){
			return '普通会员'
		}else if(role<=20){
			return '白银会员'
		}else if(role<=30){
			return '黄金会员'
		}else if(role<=40){
			return '钻石会员'
		}else if(role<=50){
			return '普通管理员'
		}else if(role<=60){
			return '高级管理员'
		}else{
			return '顶级管理员'
		}
	}
})
