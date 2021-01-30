/**
 * Controller for loading views
 */
const express = require('express')
const router = express.Router();
const Product = require('../model/Product');
const Cart = require('../model/Cart');
const {ensureAuthenticated} = require('../config/auth');

router.get('/', (req, res) =>
    res.render('homePage'));

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    let products;
    try {
        products = await Product.find();
    } catch (error) {
        products = [];
    }
    res.render('dashboard', {products});
});

router.get('/addProduct', ensureAuthenticated, async (req, res) =>
    res.render('addProduct'));

router.get('/buyProduct/:productId', async (req, res) => {
    let product;
    try {
        product = await Product.findById(req.params.productId);
    } catch (error) {
        res.json({message: error}).status(400);
    }
    res.render('buyProduct', {product});
})

router.get('/boughtProduct/:productId', async (req, res) => {
    let product;
    try {
        product = await Product.findById(req.params.productId);
    } catch (error) {
        res.json({message: error}).status(400);
    }
    console.log("You bought ", product.name, "!");
});


router.get('/findProduct', async (req, res) => {
    productName = req.query.productName;
    let products = [];
    try {
        if (productName === '' || productName == null)
            products = await Product.find();
        else
            products = await Product.find({name: productName});
    } catch (error) {
        console.log("There was problem during getting product by name");
    }
    cart = [];
    res.render('findProduct', {products: products, cart: cart});
})

router.get('/contact', ensureAuthenticated, async (req, res) => res.render('contact'))

router.get('/add-to-cart/:productId', ensureAuthenticated, async (req, res) => {
    try {
        console.log(req.params.productId);
        const addedProduct = await Product.findById(req.params.productId);
        Cart.save(addedProduct);
        console.log(Cart.getCart());
    } catch (error) {
        console.log("error");
    }
})
module.exports = router;
