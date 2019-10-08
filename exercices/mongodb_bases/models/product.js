/*jslint es6 */
const { Schema, model } = require('mongoose');

// déclaration d'un schema de données via l'API de mongoose
// le champs name possède un setter
// permettant de mettre automatiquement la valeur passée aux futures instances en minuscule
const ProductSchema = new Schema({
    name: { type: String, set: function(name) {
            return name.toLowerCase();
        } },
    price: Number,
    createdAt: Date,
});

// nous définissons un middleware au Schema Product
// qui s'exécutera juste avant (pre)
// la sauvegarde de chaque instance ('save')
ProductSchema.pre('save', function (next) {
    if (! this.createdAt) this.createdAt = new Date();
    next();
});

// Enregistrement du Schema de données auprès de mongoose
// qui nous renvoie un modèle de données prêt à être instancié/utilisé dans notre programme
const Product = model('Product', ProductSchema);

module.exports.Product = Product;