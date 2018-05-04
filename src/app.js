const express = require('express');
const fs = require('fs');
const createError = require('http-errors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'test',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(express.static(path.join(__dirname, '../public')));

require('./config/passport')(app);

// view engine setup
app.set('views', path.join(__dirname, '../public/views'));

fs.readdirSync(path.join(__dirname, './controllers')).forEach(file => {
  app.use(require('./controllers/' + path.basename(file, '.js')));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
