/*jslint es6 */
const { Schema, model } = require('mongoose');

// Définition du Shema User
// pour les besoins de notre système d'authentification, il est nécessaire d'avoir au minimum
// un champs "username" et un champs "password"
const UserSchema = new Schema({
    username: String,
    password: String,
    createdAt: Date
});

const User = model('User', UserSchema);

module.exports.User = User;