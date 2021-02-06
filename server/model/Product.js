/**
 * Product model.
 * @type {module:mongoose}
 */
const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'others'
    },
    price: Number,
    date: {
        type: Date,
        default: Date.now()
    }
});
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
