const DB=require('./DataBase/Connect')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Todos=require('./routes/Todos')
const Email=require('./routes/email')
const MailAPI=require('./routes/MailAPI')
var usersRouter = require('./routes/users');
const ImageUpload=require('./routes/UploadImage')
const cron=require('./routes/Challenge5')
const User=require('./routes/User')
const passport=require('./passport/passport')
var app = express();

// app.use('/uploads',express.static('uploads'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/User',User);
app.use('/email',MailAPI);
app.use('/users', usersRouter);
app.use('/todo',Todos);
app.use('/email',Email);
// app.use('/upload',ImageUpload)
// app.use('/cron',cron)
//upload Multer


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
  res.json({ error: err });
});
app.listen(3000)
module.exports = app;
