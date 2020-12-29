/**
 * Controller for endpoints related to the users.
 */
const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../model/User');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const bcrypt = require('bcryptjs');

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
router.post('/register', urlencodedParser, async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    console.log(user);
    bcrypt.genSalt(13, ((error, s) => {
        bcrypt.hash(user.password, s, async (err, hash) => {
            if (err)
                throw err;
            user.password = hash;
            try {
                const savedUser = await user.save();
                console.log(user.password);
                res.redirect('/users/login');
            }catch (error){
                res.json({message: err}).status(400);
            }
        })
    }))
})
module.exports = router;