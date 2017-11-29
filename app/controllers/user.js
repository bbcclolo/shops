var User = require('../models/user');

Array.prototype.customSort = function(str){
	this.sort(function (x, y) {
	    if (x[str] < y[str]) {
	        return 1;
	    }
	    if (x[str] > y[str]) {
	        return -1;
	    }
	    return 0;
	});
	return this;
}

module.exports = {
	login:function(req,res){
		res.render('login',{
			title:'登录页'
		})
	},
	regist:function(req,res){
		res.render('regist',{
			title:'注册页'
		})
	},
	testLogin:function(req,res){
		var _user = req.body;
		
		User.findByName(_user.username,function(err,user){
			if(err){
				return console.log('findByName error: ' + err)
			}
			if(!user){
				return res.json({status:'error'})
			}
			user.comparePassword(_user.password,function(err,isMatch){
				if(err){
					return console.log('password test error: ' + err)
				}
				if(!isMatch){
					return res.json({success:'error'})
				}
				console.log('密码正确呀')
				res.cookie('username',user.username)
				res.cookie('role',user.role)
				return res.json({success:'success'})
				
			})
		})
	},
	testRegist:function(req,res){
		var _user = req.body;
		
		User.findByName(_user.username,function(err,user){
			if(err){
				return console.log('findByName error: ' + err)
			}
			if(user){
				return res.json({status:'error'})
			}
			var newUser = new User(_user)
			newUser.save(function(err,user){
				if(err){
					console.log('save user error: ' + err);
				}
				return res.json({status:'success'})
			})
		})
	},
	logout:function(req,res){
		res.clearCookie('username')
		res.json({status:'success'})
	},
	list:function(req,res){
		var id = req.params.id;
		var num = 10;
		if(!id){
			id = 1
		}
		User.find({},function(err,users){
			var pages = Math.ceil(users.length/num)
			if(id > pages){
				id = 1;
			}
			users.customSort('role')
			res.render('userList',{
				title:'用户列表',
				users:users.slice((id-1)*num,num*id),
				role:req.cookies.role,
				pages:new Array(pages),
				id:id
			})
		})
	},
	postList:function(req,res){
		var data = req.body;
		User.update({_id:data.id},{$set:{role:data.role}},function(err,user){
			if(err){
				return console.log('app/controllers/user.js line 100 error: ' + err)
			}
			return res.json({'status':'success'})
		})
	},
	adminRequired:function(req,res,next){
		User.findOne({username:req.cookies.username},function(err,user){
			if(err){
				return console.log('app/controllers/user.js line 70 error: ' + err)
			}
			if(!user){
				return res.redirect('/user/login?status=0')
			}
			if(user.role <= 40){
				return res.redirect('/')
			}
			next()
		})
	},
	loginStatus:function(req,res,next){
		if(req.cookies.username){
			return res.redirect('/')
		}
		next()
	}
}


