let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let todosRouter = require('./routes/todos');

global.STATUS_CODE = require('./constants/httpStatusCodes');

let app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/todos', todosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(STATUS_CODE.NOT_FOUND));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = req.app.get('env') === 'development' ? err.message : {};
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || STATUS_CODE.INTERNAL_SERVER_ERROR);
    res.sendFile(__dirname + '/views/error.html');
});

module.exports = app;
