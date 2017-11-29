var express = require('express');
var router = express.Router();
var User = require('../app/controllers/user');

/* GET users listing. */
router.get('/login', User.loginStatus, User.login);
router.get('/regist', User.loginStatus, User.regist);
router.get('/list/:id', User.adminRequired,User.list);
router.get('/list/', User.adminRequired,User.list);

router.post('/login', User.testLogin);
router.post('/regist', User.testRegist);
router.post('/logout', User.logout);
router.post('/list', User.postList);

module.exports = router;
