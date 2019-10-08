/* jslint es6 */
var express = require('express');
var router = express.Router();
const {Product} = require('../models/product');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.user) {
        console.log('user connected');
        console.log(req.user);
    }
    res.render('index', {title: 'Express'});
});

router.post('/add_product', function (req, res, next) {
    let product = new Product();
    product.name = req.body.product_name;
    product.price = req.body.product_price;
    product.createdAt = new Date();
    product.save(function(err) {
        if (err) {
            console.log('Error during insertion of the Product');
            console.log(err);
        }
    });
    res.render('add_product', {product: product});
});

router.get('/list_products', function (req, res, next) {
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

router.get('/profile', function (req, res, next) {
    if (req.user) {
        console.log(req.user);
        res.send('vous êtes connecté');
    } else {
        res.send('vous n\'êtes pas connecté');
    }
});

router.get('/chat', function (req, res, next) {
    res.render('chat', {});
});









module.exports = router;
