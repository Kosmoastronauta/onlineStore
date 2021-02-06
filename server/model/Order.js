const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    products: [[Product]],
    date: {
        type: Date,
        default: Date.now()
    }
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Product;
