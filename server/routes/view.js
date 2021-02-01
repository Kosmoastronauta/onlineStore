/**
 * Controller for loading views
 */
const express = require('express')
const router = express.Router();
const Product = require('../model/Product');
const Cart = require('../model/Cart');
const User = require('../model/User')
const {ensureAuthenticated} = require('../config/auth');

router.get('/',  async (req, res) => {
    let products;
    try {
        products = await Product.find();
    } catch (error) {
        products = [];
    }
    res.render('homePage', {products});
    });

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    let products;
    try {
        products = await Product.find();
    } catch (error) {
        products = [];
    }
    console.log(req.user.username);
    res.render('dashboard', {products});
});

router.get('/adminDashboard', ensureAuthenticated, async (req, res) => {
    let products;
    let users;
    try {
        products = await Product.find();
        users = await User.find();
    } catch (error) {
        products = [];
        users = [];
    }
    res.render('adminDashboard', {products});
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
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    res.render('findProduct', {products: products, cart: cart});
})

router.get('/contact', ensureAuthenticated, async (req, res) => res.render('contact'))

router.get('/add-to-cart/:productId', ensureAuthenticated, async (req, res) => {
    let cart;
    try {
        console.log("SESSION: ", req.session);
        const addedProduct = await Product.findById(req.params.productId);
        cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.addProduct(addedProduct);
        req.session.cart = cart;
        console.log("Total price before: ", req.session);
        req.session.save(() => {
            console.log("saved");
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/buyProductsWithCart', ensureAuthenticated, async (req, res) => {
    res.render('buyWithCart', {cart: req.session.cart});
})

router.post('/buyProductsWithCart', ensureAuthenticated, async (req, res) => {
    let cart = req.session.cart;
    cart.products.forEach(product => removeProductById(product._id));
});

async function removeProductById(id) {
    console.log(id);
    try {
        await Product.deleteOne({_id: id});
        console.log("removed product with id: " + id);
    } catch (error) {
        console.log("Could not remove product with id: "+id);
    }
}

module.exports = router;
