$(function(){
	$('.shopCart').on('click','.delete',function(){
		var confim = confirm('亲，您确定要删除该商品吗？')
		if(!confim){
			return;
		}
		var tr = $(this).parents('tr');
		var id = tr.attr('id');
		
		$.ajax({
			url:'/cart?id='+id,
			type:'DELETE',
			success:function(data){
				if(data.status === 'success'){
					tr.remove()
					totalMoney()
				}
			}
		})
	})
	
	$('.shopCart').on('click','.reduce',function(e){
		show(-1,$(this));
	})
	$('.shopCart').on('click','.add',function(e){
		show(1,$(this));
	})
	$('.shopCart').on('change','.count',function(e){
		show(0,$(this));
	})
	
	function show(num,obj){
		var countObj = obj.parent().find('.count');
		var count = parseInt(countObj.val());
		var id = obj.parents('tr').attr('id');
		switch(num){
			case -1:
				if(count > 1){
					count--
				}else{
					return;
				}
				break;
			case 0:
				if(count > 10 || count < 1 || isNaN(count)){
					count = 1;
				}
				break;
			case 1:
				if(count < 10){
					count++
				}else{
					return;
				}
				break;
			
		}
//		if(num === -1){
//			if(count > 1){
//				count--
//			}else{
//				return;
//			}
//		}else if(num === 0){
//			if(count > 10 || count < 1 || isNaN(count)){
//				console.log(123)
//				count = 1;
//			}else{
//				return;
//			}
//		}else if(num === 1){
//			if(count < 10){
//				count++
//			}else{
//				return;
//			}
//		}
		$.ajax({
			type:"put",
			url:"/cart?id=" + id + '&count=' + count,
			success:function(data){
				if(data.status === 'success'){
					countObj.val(count)
					totalMoney();
				}
			}
		});
	}
	
	
	
	$('#checkAll').on('click',function(){
		var bool = $(this).prop('checked')
		$('.shopCart .check').prop('checked',bool)
		totalMoney()
	})
	
	$('.shopCart').on('click','.check',function(){
		var flag = !($('.shopCart .check').length > $('.shopCart .check:checked').length);
		$('#checkAll').prop('checked',flag)
		totalMoney()
	})
	
	function totalMoney(){
		var checkEle = $('.shopCart .check:checked');
		var money = 0;
		for(var i=0;i<checkEle.length;i++){
			money+=parseInt(checkEle.eq(i).parent().siblings('.price').html())*parseInt(checkEle.eq(i).parent().siblings().find('.count').val());
		}
		
		$('#totalMoney,#modal-money').html(money.toFixed(2))
	}
	
	$('#settle').on('click',function(e){
		if($('.shopCart .check:checked').length === 0){
			alert('请选择商品！')
			return false;
		}
	})
	
	$('#confirmMoney').on('click',function(){
		var checkeds = $('.shopCart .check:checked');
		var data = {};
		for(var i=0;i<checkeds.length;i++){
			data.id = checkeds.eq(i).parents('tr').attr('id');
			if(i === checkeds.length-1){
				data.bool = true;
			}
			$.ajax({
				type:"post",
				url:"/cart/buy",
				data:data,
				success:function(data){
					if(data.payStatus === 'success'){
						location.href = '/cart/pay/success'
					}else{
						location.href = '/cart/pay/failed'
					}
				}
			});
		}
		
	})
	
})
