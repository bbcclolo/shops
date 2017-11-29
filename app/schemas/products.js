var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var ProductSchema = new mongoose.Schema({
	name:String,
	price:Number,
	imgSrc:String
})

module.exports = ProductSchema;








