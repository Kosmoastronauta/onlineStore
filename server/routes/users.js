/**
 * Controller for endpoints related to the users.
 */
const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../model/User');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const bcrypt = require('bcryptjs');
const passport = require('passport')

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
router.post('/login', urlencodedParser, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failuerRedirect: '/login',
        failureFlash: true
    })(req, res, next);
})

/**
 * Endpoint responsible for registration. Fields are sent in the body of HTTP request.
 * Fields: name, email, password, password2
 *
 * POST at: /register
 * @see ./views/login.ejs
 */
router.post('/register', urlencodedParser, async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    var errors = getValidationErrors(user);

    if (errors.length == 0) {
        console.log(user);
        bcrypt.genSalt(13, ((error, s) => {
        bcrypt.hash(user.password, s, async (err, hash) => {
            if (err)
                throw err;
            user.password = hash;
            try {
                const savedUser = user.save();
                console.log(user.password);
                res.redirect('/users/login');
            } catch (error) {
                res.json({message: err}).status(400);
                }
            })
        }))
    }
    else 
        console.log(errors);
});

function getValidationErrors(user) {
    var errors = [];

    if (user.username == '' || user.email == '')
        errors.push("Empty username or adress.");

    User.findOne({
        username: user.username
    }).then(user => {
        if (user) {
            errors.push("Username already exists.")
        }});
    
    if (!validateEmail(user.email)) 
        errors.push("Incorrect email.");
    
    if (user.password.length < 5)
        errors.push("Password is too short.");

    if (user.password != user.password2)
        errors.push("Passwords do not match.");
        
    return errors;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

module.exports = router;