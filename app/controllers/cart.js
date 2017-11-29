var Cart = require('../models/cart');
var User = require('../models/user');
var Product = require('../models/products');
var Order = require('../models/order');

module.exports = {
	addCart:function(req,res){
		var id = req.params.id;
		User.findOne({username:req.cookies.username},function(err,user){
			if(err){
				return console.log('addCart find user error: ' + err)
			}
			if(!user){
				return res.redirect('/user/login?status=0')
			}
			
			Cart.findOne({uId:user._id,cId:id},function(err,cart){
				if(err){
					return console.log(err)
				}
				if(cart){
					Cart.update({uId:user._id,cId:id},{$set:{cCount:cart.cCount+1}},function(err){
						if(err){
							return console.log('product update error: ' + err)
						}
					})
				}
			})
			
			
			Product.findOne({_id:id},function(err,product){
				if(err){
					return console.log('找产品的时候报错了： ' + err)
				}
				if(product){
					Cart.create({
						uId:user._id,
						cId:id,
						cName:product.name,
						cPrice:product.price,
						cImgSrc:product.imgSrc,
						cCount:1,
						cStatus:false,
					},function(err,doc){
						if(doc){
							return res.redirect('/cart');
						}
					})
				}
			})
		})
		
	},
	cart:function(req,res){
		User.findOne({username:req.cookies.username},function(err,user){
			if(err){
				return console.log('addCart find user error: ' + err)
			}
			if(!user){
				return res.redirect('/user/login?status=0')
			}
			Cart.find({uId:user._id,cStatus:false},function(err,carts){
				res.render('cart',{
					title:'购物车',
					carts:carts
				})
			})
		})
	},
	del:function(req,res){
		var id = req.query.id;
		
		Cart.remove({_id:id},function(err,cart){
			if(err){
				return console.log('delete cart product error: ' + err)
			}
			return res.json({status:'success'})
		})
	},
	put:function(req,res){
		var id = req.query.id;
		var count = parseInt(req.query.count);
		Cart.update({_id:id},{$set:{cCount:count}},function(err){
			if(err){
				return console.log('add or reduce error： ' + err)
			}
			return res.json({status:'success'})
		})
	},
	buy:function(req,res){
		var data = req.body;
		User.findOne({username:req.cookies.username},function(err,user){
			if(err){
				return console.log('pay find user error: ' + err)
			}
			if(user){
				Cart.findOne({uId:user._id,_id:data.id},function(err,cart){
					if(err){
						return console.log('app/controller/cart.js line 98 error: ' + err)
					}
					if(cart){
						var _order = new Order({
							uId:cart.uId,
							cId:cart.cId,
							cName:cart.cName,
							cPrice:cart.cPrice,
							cImgSrc:cart.cImgSrc,
							cCount:cart.cCount,
							cStatus:true
						});
						Order.findOne({uId:user._id,cId:data.id},function(err,order){
							if(err){
								return console.log('app/controller/cart.js line 106 error: ' + err)
							}
							if(order){
								Order.update({uId:user._id,cId:data.id},{$set:{cStatus:_order.cCount+order.cCount}},function(err){
									if(err){
										return console.log('app/controller/cart.js line 112 error: ' + err)
									}
									return res.json({payStatus:'success'})
								})
							}
						})
						_order.save(function(err){
							if(err){
								return console.log('app/controller/cart.js line 126 error: ' + err)
							}
							Order.find({},function(err,orders){
								if(data.bool){
									return res.json({payStatus:'success'})
								}
							})
						})
						
//						Cart.update({uId:user._id,_id:data.id},{$set:{cStatus:true}},function(err){
//							if(err){
//								return console.log('app/controller/cart.js line 102 error: ' + err)
//							}
//							if(data.bool){
//								res.json({payStatus:'success'})
//							}
//						})
					}
				})
			}
		})
	},
	buySuccess:function(req,res){
		User.findOne({username:req.cookies.username},function(err,user){
			if(err){
				return console.log('app/controller/cart.js line 117 error: ' + err)
			}
			if(!user){
				return res.redirect('/user/login?status=0')
			}
			res.render('success',{
				title:'购物成功'
			})
		})
		
	},
	buyFailed:function(req,res){
		User.findOne({username:req.cookies.username},function(err,user){
			if(err){
				return console.log('app/controller/cart.js line 117 error: ' + err)
			}
			if(!user){
				return res.redirect('/user/login?status=0')
			}
			res.render('failed',{
				title:'购物失败'
			})
		})
	}
}
