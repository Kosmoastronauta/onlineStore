/**
 * Controller for all endpoints which starts with /view prefix
 */
const express = require('express')
const router = express.Router();

router.get('/', (req, res) =>
    res.render('homePage'));
module.exports = router;