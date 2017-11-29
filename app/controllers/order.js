var Order = require('../models/order');
var User = require('../models/user');

module.exports = {
	getOrders:function(req,res){
		User.findOne({username:req.cookies.username},function(err,user){
			if(err){
				return console.log('addCart find user error: ' + err)
			}
			if(!user){
				return res.redirect('/user/login?status=0')
			}
			Order.find({},function(err,orders){
				if(err){
					return console.log('app/controllers/order.js line 7 error: ' + err)
				}
				res.render('order',{
					title:'我的订单',
					orders:orders
				})
			})
		})
	}
}

