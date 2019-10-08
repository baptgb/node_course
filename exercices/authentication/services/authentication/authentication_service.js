const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../../models/user');
const sha256 = require('crypto-js/sha256');
const passport = require('passport');

// Uen Strategy Local permet de définir manuellement le comportement de notre authentification
const strategy = new LocalStrategy({},
    // cette fonction de callback doit définir la capacité à récupérer un utilisateur
    // en fonction du username et password qui nous est donné
    // par défaut, Passport récupèrera ces informations depuis le formulaire qui appellera la fonction d'authentification
    // en l'occurence ce formulaire devra avoir les champs "username" et "password", sauf configuration contraire
    function(username, password, done) {
        // nous recherchons un utilsiateur dans la base de données par son username
        User.findOne({ username: username }, function (err, user) {
            // gestion des erreurs
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // nous validons le password de la requête avec celui stocké en base de données
            if (!validatePassword(user, password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            // tout s'est bien passé, il n'y a pas d'erreur (null) et nous avons un utilisateur valide (user)
            return done(null, user);
        });
    }
);

// indique à Passport comment stocker les données en session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// indique à Passport comment récupérer un utilisateur à partir des données serialisées en session
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

function validatePassword(user, password) {
    return (hashPassword(password) == user.password);
}

function hashPassword(password) {
    return sha256(password);
}

module.exports.strategy = strategy;
module.exports.validatePassword = validatePassword;
module.exports.hashPassword = hashPassword;