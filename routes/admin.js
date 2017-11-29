var express = require('express');
var router = express.Router();
var admin = require('../app/controllers/admin');

/* GET home page. */
router.get('/addP', admin.addProductPage);
router.post('/addP/new', admin.addProduct);

module.exports = router;