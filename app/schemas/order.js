var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
	uId:{   //用户id
		type:String
	},
	cId:{   //商品id
		type:String
	},
	cName:{   //商品名称
		type:String
	},
	cPrice:{  //商品价格
		type:String
	},
	cImgSrc:{  //商品图片路径
		type:String
	},
	cCount:{  //商品数量
		type:Number
	},
	cStatus:{  //商品结算状态，默认为false
		type:Boolean,
		default:false
	}
})

module.exports = orderSchema;
