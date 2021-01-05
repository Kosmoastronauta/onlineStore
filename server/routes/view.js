/**
 * Controller for loading views
 */
const express = require('express')
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

router.get('/',(req, res) =>
    res.render('homePage'));

router.get('/dashboard', (req, res) =>
    res.render('dashboard'));

router.get('/addProduct', (req, res) =>
    res.render('addProduct'));

module.exports = router;