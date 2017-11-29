var Product = require('../models/products');

module.exports = {
	product:function(req, res, next) {
		Product.find({},function(err,products){
			if(err){
				return console.log('product find error: ' + err)
			}
			res.render('index', { 
				title: '首页' ,
				products:products
			});
		})
	}
}

