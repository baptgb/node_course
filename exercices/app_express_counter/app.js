var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// views/ sera le répertoire où seront placées les vues de notre application
app.set('views', path.join(__dirname, 'views'));
// configuration de l'application pour que les fichiers *.jade soient considérés comme des templates
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// public/ sera le dossier contenant les fichiers statiques - ie. à destination du ~navigateur~
// eg. *.css , *.js , *.jpg , ...
app.use(express.static(path.join(__dirname, 'public')));

// initialisation d'une variable dans les locals de l'application
// les locals de l'application sont valables pour toute la durée de vie de l'application
app.locals.counter = 0;

// compter toutes les requêtes entrantes
app.use(function (req, res, next) {
    // req.app.locals == app.locals
    req.app.locals.counter = (req.app.locals.counter + 1);
    next();
});
// affichage du nombre de requêtes
app.use(function (req, res, next) {
    // on utilise req.app.locals pour accéder aux variables disponibles pour toute la durée de vie de l'application
    console.log('Nombre de requêtes : ' + req.app.locals.counter);
    next();
});

// intégration des routes configurés dans l'application Express
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    // passer une données dans next() indique qu'une erreur s'est produite
    // le prochain middleware appelé sera directement celui désigné pour gérer les erreurs
    next(createError(404));
});

// error handler
// ce middleware est considéré comme un middleware pouvant gérer les erreurs
// ce mécanisme est réalisé automatiquement par Express, à partir du moment où un quatrième argument - err - est déclaré
// err contiendra l'erreur passée dans next() dans le précédent middleware
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
