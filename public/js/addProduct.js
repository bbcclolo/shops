$(function(){
	$('#add').on('click',function(){
		var name = $('#name').val();
		var price = $('#price').val();
		var imgSrc = '/images/iphone8.jpg';
		if(!name){
			alert('商品名称不能为空！')
			return false;
		}
		if(!price){
			return false;
			alert('商品单价不能为空！')
		}
		var data = $('form').serialize();
		data+='&imgSrc=/images/iphone8.jpg';
		console.log(data)
		
		$.ajax({
			type:"post",
			url:"/admin/addP/new",
			data:data,
			success:function(data){
				if(data.status === 'success'){
					location.href = '/'
				}
			}
		});
	})
})
