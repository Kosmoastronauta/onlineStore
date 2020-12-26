const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: String,
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

module.exports = mongoose.model('Product', ProductSchema);