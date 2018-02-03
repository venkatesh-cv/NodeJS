// dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bauth = require('basic-auth-connect');
var baseService = require('./services/baseService');

// controllers
var routes = require('./routes/index');
var users = require('./routes/users');
var post = require('./routes/post');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(bauth(function(user,pwd){
//	 return 'admin'=== user && 'admin' === pwd;
//}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// interceptors
baseService.beforeInterceptors.add(function(){
	console.log('before');	
});
baseService.beforeInterceptors.add(function(){
	console.log('another before');	
});
baseService.afterInterceptors.add(function(){
	console.log('after');	
});
// route mappings - note these are also filters
// TODO: introduce a controller folder and wire all controllers automatically
app.use('/', routes);
app.use('/users', users);
app.use('/post', post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
app.listen(8080);
var exitHandler = function(){
	mongoose.connection.close();
	console.log('exit handler - Connection closed');
	console.log('exit handler - Shutting down');
}

process.on('exit',exitHandler);
process.on('SIGINT',exitHandler);
process.on('uncaughtException',exitHandler);
mongoose.connect('mongodb://localhost:27017/test');
module.exports = app;
