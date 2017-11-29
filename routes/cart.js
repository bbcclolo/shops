var express = require('express');
var router = express.Router();
var cart = require('../app/controllers/cart');

router.get('/',cart.cart)

router.get('/addCart/:id',cart.addCart)

router.post('/buy',cart.buy)

router.get('/pay/success',cart.buySuccess)
router.get('/pay/failed',cart.buyFailed)

router.delete('/',cart.del)
router.put('/',cart.put)

module.exports = router;
