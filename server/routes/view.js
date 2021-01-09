/**
 * Controller for loading views
 */
const express = require('express')
const router = express.Router();
const Product = require('../model/Product');
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

router.get('/addProduct', ensureAuthenticated, async (req, res) =>
    res.render('addProduct'));

router.get('/contact',ensureAuthenticated,async (req,res)=> res.render('contact'))
module.exports = router;