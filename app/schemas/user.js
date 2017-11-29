var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	role:{
		type: Number,
    	default: 0
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

UserSchema.pre('save',function(next){
	var user = this;
	if(this.isNew){  //判断这条数据是否是新加的
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}
	
	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){  //生成盐
		if(err){
			return next(err)
		}
		bcrypt.hash(user.password,salt,function(err,hash){
			if(err){
				return next(err)
			}
				
			user.password = hash;
			next()
		})
	})
	
}) 

UserSchema.methods = {
	comparePassword:function(_password,cb){
		bcrypt.compare(_password,this.password,function(err,isMatch){
			if(err){
				return cb(err)
			}
			cb(null,isMatch)
		})
	}
}

UserSchema.statics = {  // 静态方法
	fetch:function(cb){  //取出目前数据库里的所有数据
		return this
		.find({})
		.sort('meta.updateAt')   //按照更新时间排序
		.exec(cb)  //执行回调函数
	},
	findById:function(id,cb){  //取出目前数据库里的所有数据
		return this
		.findOne({_id:id})
		.exec(cb)  //执行回调函数
	},
	findByName:function(name,cb){  //取出目前数据库里的所有数据
		return this
		.findOne({username:name})
		.exec(cb)  //执行回调函数
	}
}

module.exports = UserSchema;








