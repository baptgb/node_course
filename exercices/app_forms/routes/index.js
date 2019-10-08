var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/add_product', function (req, res, next) {
    res.render('add_product', {title: 'Ajouter un produit'});
});

// traitement des données de formulaire
router.post('/send_product', function (req, res, next) {
    // les données automatiquements parsées sont présentes dans req.body
    var product = {
        name: req.body.product_name,
        price: req.body.product_price
    };
    // chaque object "product" est ajouté dans le tableau initialisé précédement
    req.app.locals.products.push(product);
    res.render('send_product', {product: product});
});

router.get('/list_products', function (req, res, next) {
    // les produits peuvent être listés en passant directement notre tableau sauvegardé dans les locals
    res.render('list_products', {
        products: req.app.locals.products
    });
});

module.exports = router;
