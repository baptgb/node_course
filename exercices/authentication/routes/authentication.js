/* jslint es6 */
var express = require('express');
var router = express.Router();
const passport = require('passport');
const {User} = require('../models/user');
const authenticationService = require('../services/authentication/authentication_service');

// affiche le formulaire d'enregistrement d'un utilisateur
router.get('/register', function (req, res, next) {
    res.render('register');
});

// traite les données envoyées par le formulaire d'enregistrement
router.post('/register', function (req, res, next) {
    const user = new User();
    // on ne sauvegarde pas un mot de passe en clair dans une base de données !
    // le strict minimum est l'utilisation d'un hash
    user.password = authenticationService.hashPassword(req.body.password);
    user.username = req.body.username;
    user.save(function (err) {
        if (err) {
            console.log('An error occurred while saving the new user');
            console.log(err);
        } else {
            console.log('User created !');
        }
    });
    res.render('login');
});

// affichage du formulaire de connexion
router.get('/login', function (req, res, next) {
    res.render('login');
});

// traitement des données du formulaire de connexion
router.post('/login', function (req, res, next) {
    // l'appel à la fonction passport.authenticate() permet d'exécuter le process d'authentification "local"
    // cf. LocalStrategy (authentication_service.js)
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        // req.login() crée la session lorsque nous sommes sûrs que l'utilisateur est bien authentifié
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

module.exports = router;
