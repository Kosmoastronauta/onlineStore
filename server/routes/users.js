/**
 * Controller for endpoints related to the users.
 */
const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false});

/**
 * Endpoint responsible for returning page for signing in.
 *
 * GET at: /login
 * @see ./views/register.ejs
 */
router.get('/login', (req, res) =>
    res.render('login'));

/**
 * Endpoint responsible for returning page for signing in.
 *
 * GET at: /register
 * @see ./views/register.ejs
 */
router.get('/register', (req, res) =>
    res.render('register'));
/**
 * Endpoint responsible for signing in. Fields are sent in the body of HTTP request.
 * Fields: email, password
 *
 * POST at: /login
 * @see ./views/login.ejs
 */
router.post('/login', urlencodedParser, (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
})

/**
 * Endpoint responsible for registration. Fields are sent in the body of HTTP request.
 * Fields: name, email, password, password2
 *
 * POST at: /register
 * @see ./views/login.ejs
 */
router.post('/register', urlencodedParser, (req, res) => {
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.password2);
})
module.exports = router;