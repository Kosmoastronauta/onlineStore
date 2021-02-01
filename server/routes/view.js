/**
 * Controller for loading views
 */
const express = require('express')
const router = express.Router();
const Product = require('../model/Product');
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

router.get('/buyProduct/:productId',  async (req, res) => {
    let product;
    try {
        product = await Product.findById(req.params.productId);
    } catch (error) {
        res.json({message: error}).status(400);
    }
    res.render('buyProduct', {product});
})

router.get('/boughtProduct/:productId',  async (req, res) => {
    let product;
    try {
        product = await Product.findById(req.params.productId);
    } catch (error) {
        res.json({message: error}).status(400);
    }
    console.log("You bought ", product.name, "!");
})
    
router.get('/contact',ensureAuthenticated,async (req,res)=> res.render('contact'))
module.exports = router;