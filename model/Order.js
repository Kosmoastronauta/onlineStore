const mongoose = require('mongoose')
const OrderSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    productNames: {
        type: [String],
        default: []
    },
    productsIds: {
        type: [String],
        default: []
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    finished: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
