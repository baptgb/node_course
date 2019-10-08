var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// le module mustache-express permet d'intégrer facile le moteur de templates Mustache à Express
var mustacheExpress = require('mustache-express');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// nous définissons le nouveau moteur au sein d'Express
// cf. documentation de mustache
app.engine('mustache', mustacheExpress());
// le répertoire contenant les templates reste le même
app.set('views', path.join(__dirname, 'views'));
// configure l'extension des fichiers de templates en *.mustache
app.set('view engine', 'mustache');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    req.app.locals.counter = (req.app.locals.counter + 1) || 1;
    next();
});

app.use(function(req, res, next) {
    console.log(req.app.locals.counter);
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    res.render('error', {
        nom: 'John',
        prix_ht: 41,
        prix_ttc: function() {
            return (this.prix_ht * 1.20).toFixed(2);
        },
        afficher_message: true
    });

});

module.exports = app;
