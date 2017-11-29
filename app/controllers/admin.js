var Product = require('../models/products');

module.exports = {
	addProduct:function(req,res){
		var _product = req.body;
		
		var product = new Product(_product)
		
		product.save(function(err,product){
			if(err){
				return console.log('product save error: ' + err)
			}
			console.log('product save success!',product)
			return res.json({status:'success'})
		})
	},
	addProductPage:function(req,res){
		res.render('addProduct',{
			title:'添加商品'
		})
	}
}
