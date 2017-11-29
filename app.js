var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./app/models/user');

var index = require('./routes/index');
var user = require('./routes/user');
var admin = require('./routes/admin');
var cart = require('./routes/cart');
var order = require('./routes/order');

var app = express();

mongoose.connect('mongodb://localhost:27017/shop',{useMongoClient: true})
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connect error !'))
db.once('open', function() {
	console.log(123)
    console.log('Mongodb started !')
})

// view engine setup
app.set('views', path.join(__dirname, 'views/pages/'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
	User.findOne({username:req.cookies.username},function(err,user){
		if(err){
			console.log('app.js line 42 error: ' + err)
		}
		if(!user){
			res.cookie('username','');
		}
		next()
	})
})

app.use('/', index);
app.use('/user', user);
app.use('/admin', admin);
app.use('/cart', cart);
app.use('/order', order);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.locals.moment = require('moment');

module.exports = app;
