var express = require('express');
var app = express();
const port = 5000;
app.listen(port);
var createError = require('http-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const postsRoute = require('./routes/posts');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://new-user123:new-user123@cluster0.m0t90.mongodb.net/test', ()=>{
    console.log('connected to DB');
});
//BodyParser







app.get('/', (req, res)=>{
  res.send("Home Page")
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Middlewares
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/posts', postsRoute);
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
