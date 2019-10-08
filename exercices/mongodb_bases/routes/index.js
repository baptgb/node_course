/* jslint es6 */
var express = require('express');
var router = express.Router();
const {Product} = require('../models/product');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
    console.log('blah');
});

// lors de l'envoie de données de formulaire sur cette URL
// nous pouvons les traiter et effectuer une persistance dans MongoDB
router.post('/add_product', function (req, res, next) {
    // nouvelle instance de Product
    let product = new Product();
    product.name = req.body.product_name;
    product.price = req.body.product_price;
    // sauvegarde de la nouvelle instance dans MongoDB
    product.save(function(err) {
        if (err) {
            console.log('Error during insertion of the Product');
            console.log(err);
        }
    });
    res.render('add_product', {product: product});
});

// affichage de tous les produits présents en base de données
router.get('/list_products', function (req, res, next) {
    // find() est l'une des méthodes de classe disponible pour effectuer une requête dans MongoDB
    Product.find(function (err, products) {
        if (err) {
            console.log('Error while fetching the documents');
            console.log(err);
            next();
        } else {
            res.render('list_products', {products: products});
        }
    });
});

router.post('/delete_product', function (req, res, next) {
    // deleteOne() permet de supprimer un élément dans la base de données en fonction de critères
    Product.deleteOne({_id: req.query.product}, function (err) {
        if (err) {
            console.log('Error while deleting product');
            console.log(err);
            next();
        } else {
            res.redirect('/list_products');
        }
    });
});

module.exports = router;
