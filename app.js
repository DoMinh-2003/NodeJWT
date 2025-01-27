var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const verifyToken = require('./middleware/verifyToken'); 
require('dotenv').config()


const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swaggerConfig');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const mongoose = require('mongoose');

var app = express();

const url = "mongodb://localhost:27017/local"
const connect = mongoose.connect(url);

connect.then((then) =>{
console.log("Connected")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(verifyToken);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
