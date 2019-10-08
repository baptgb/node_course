/*jslint es6 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');

// nous définissons et importons un service qui gère et configure l'authentification
const authenticationService = require('./services/authentication/authentication_service');
// passport est le module qui nous permet de gérer facilement l'authentification désirée
const passport  = require('passport');
// le module express-session est nécessaire pour implémenter la gestion des sessions dans Express
const session = require('express-session');

mongoose.connect('mongodb://exercice_user:secret@localhost/exercice', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => console.log('Connected to MongoDB'));

// le service d'authentification que nous avons défini exporte une Strategy
// cette Strategy est donnée en configuration au module passport avec passport.use()
passport.use(authenticationService.strategy);

const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');

const app = express();

// dans cet ordre précis, nous activons les sessions au sein d'Express
// puis nous initialisons passport
// puis nous indiquons à Express d'utiliser la surcouche des sessions fournie par Passport
app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authenticationRouter);

module.exports = app;
