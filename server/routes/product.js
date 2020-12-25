const express = require('express')
const router = express.Router();
const Product = require('../model/Product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // get all products, there is  option "limit" after limit() ex. Product.find().limit(10)
        res.json(products);
    } catch (error) {
        res.json({message: error});
    }
});

router.post('/', async (req, res) => {
    // console.log(req.body);
    const product = new Product({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (error) {
        res.json({message: error});
    }
});
module.exports = router;