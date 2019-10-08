/*jslint es6 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// le module mongoose est un ODM (Object-Document Manager)
const mongoose = require('mongoose');

const mustacheExpress = require('mustache-express');

// nous connectons notre programme à MongoDB via l'appel à mongoose.connect()
mongoose.connect('mongodb://exercice_user:secret@localhost/exercice', {
    useNewUrlParser: true, // cf. documentation
    useUnifiedTopology: true
});

// nous placons un callback sur l'évènement 'open'
// lorsque la connexion sera établie, ce callback sera appelé
mongoose.connection.on('open', () => console.log('Connected to MongoDB'));

const indexRouter = require('./routes/index');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
