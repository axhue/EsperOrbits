var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var frontend = require('./routes/frontend')
var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', routes);
if (app.get('env') === 'production') {
  app.use('/', frontend);
  app.use(express.static(__dirname + '/../dist'));
  
}

var mongoose = require ("mongoose"); 


if (app.get('env') === 'development' || app.get('env') === 'testing' ) {
  console.log('running in development')
  var uristring = process.env.MONGODB_URI_TEST
  if (uristring === undefined) {
    throw 'MONGODB_URI_TEST is undefined please set your environment variables'
  }
} else if (app.get('env') === 'production'){
  console.log('running in production')
  var uristring = process.env.MONGODB_URI
  if (uristring === undefined) {
    throw 'MONGODB_URI is undefined please set your environment variables'
  }
}

mongoose.connect(uristring)

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error: '));
db.once('open',function(){
  console.log('connected to db')
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'testing') {
  app.use(function(err, req, res, next) {
    console.log('ERROR: ' + err.message)
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
