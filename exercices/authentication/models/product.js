/*jslint es6 */
const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: String,
    price: Number,
    createdAt: Date
});

/**
 *
 */
const Product = model('Product', ProductSchema);

module.exports.Product = Product;