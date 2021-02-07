/**
 * Controller for loading views
 */
const express = require('express')
const router = express.Router();
const Product = require('../model/Product');
const Cart = require('../model/Cart');
const Order = require('../model/Order');
const Role = require('../config/role');
const {ensureAuthenticated} = require('../config/auth');
const {ensureAdminAuthenticated} = require('../config/auth');

router.get('/', async (req, res) => {
    let products;
    try {
        products = await Product.find();
    } catch (error) {
        products = [];
    }
    res.render('homePage', {products: products});
});

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    let products;
    try {
        products = await Product.find();
    } catch (error) {
        products = [];
    }
    console.log(req.user.username);
    if (req.user.role === Role.Admin)
        res.render('adminDashboard', {products: products});
    else
        res.render('dashboard', {products: products});
});

router.get('/adminDashboard', ensureAdminAuthenticated, async (req, res) => {
    let products;
    try {
        products = await Product.find();
    } catch (error) {
        products = [];
    }
    res.render('adminDashboard', {products});
});

router.get('/adminFindProduct', ensureAdminAuthenticated, async (req, res) => {
    let productName = req.query.productName;
    let products = [];
    try {
        if (productName === '' || productName == null)
            products = await Product.find();
        else
            products = await Product.find({name: productName});
    } catch (error) {
        console.log("There was problem during getting product by name");
    }
    res.render('adminFindProduct', {products: products});
})

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


router.get('/findProduct',ensureAdminAuthenticated, async (req, res) => {
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
    res.render('adminFindProduct', {products: products});
})

router.get('/contact', ensureAuthenticated, async (req, res) => res.render('contact'))

router.get('/add-to-cart/:productId', ensureAuthenticated, async (req, res) => {
    let cart;
    try {
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
    let productNames =[];
    cart.products.forEach(product => productNames.push(product.name));
    let productsIds =[];
    cart.products.forEach(product => productsIds.push(product._id));
    let order = await new Order({userEmail: req.user.email, productNames: productNames, productsIds: productsIds, totalPrice: cart.totalPrice});
    order.save();
});


router.get('/editProduct/:productId', ensureAdminAuthenticated, async (req, res) => {
    let product;
    try {
        product = await Product.findById(req.params.productId);
        order.isFinished
    } catch (error) {
        res.json({message: error}).status(400);
    }
    res.render('adminEditProduct', {product: product});
})

router.get('/getOrdersInProgress',ensureAdminAuthenticated , async (req, res) => {
    let orders;
    try {
        orders = await Orders.find(isFinished = false); 
        // get all orders
    } catch (error) {
        orders = [];
    }
    res.render('ordersInProgress', {orders});
});


async function removeProductById(id) {
    console.log(id);
    try {
        await Product.deleteOne({_id: id});
        console.log("removed product with id: " + id);
    } catch (error) {
        console.log("Could not remove product with id: " + id);
    }
}

module.exports = router;
