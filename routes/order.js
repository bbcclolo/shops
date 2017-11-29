var express = require('express');
var router = express.Router();
var order = require('../app/controllers/order');

router.get('/',order.getOrders);

module.exports = router;

