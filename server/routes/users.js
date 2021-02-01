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
const Role = require('../config/role');
const {ensureAuthenticated} = require('../config/auth');
const {ensureAdminAuthenticated} = require('../config/auth');
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
        failureRedirect: '/users/login',
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
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: Role.User
    });

    let errors = await getValidationErrors(user);

    if (errors.length === 0) {
       saveUser(user, res);
       res.redirect('/users/login');
    }
     else
        console.log(errors);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    req.session.destroy();
    res.redirect('/users/login');
    // req.flash('success_msg', "Logged out");
})

async function getValidationErrors(user) {
    let errors = [];

    if (user.username === '' || user.email === '')
        errors.push("Empty username or adress.");

    let userFromDB = await User.findOne({
        username: user.username
    }).then(existingUser => {
        return existingUser
    });

    if (userFromDB != null)
        errors.push("Username already exists.");

    if (!validateEmail(user.email))
        errors.push("Incorrect email.");

    if (user.password.length < 5)
        errors.push("Password is too short.");

    if (!user.password.localeCompare(user.password2))
        errors.push("Passwords do not match.");

    return errors;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function saveUser(user, res) {
    bcrypt.genSalt(13, ((error, s) => {
        bcrypt.hash(user.password, s, async (err, hash) => {
            if (err)
                throw err;
            user.password = hash;
            try {
                user.save();
                console.log(user.password);
                res.redirect('/users/login');
            } catch (error) {
                res.json({message: err}).status(400);
            }
        })
    }))
}

/**
 * Endpoint responsible for getting all users in the system.
 * GET at: /getUsers
 * @see User
 */
router.get('/getUsers',ensureAdminAuthenticated , async (req, res) => {
    let users;
    try {
        users = await User.find(); // get all users, there is  option "limit" after limit() ex. User.find().limit(10)
    } catch (error) {
        users = [];
    }
    res.render('listOfUsers2', {users});
});

/**
 * Endpoint responsible for creating new user to the system.
 * POST at: /adduser
 * @see User
 */
router.post('/', ensureAuthenticated, async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser).status(201);
    } catch (error) {
        res.json({message: error}).status(400);
    }
});

/**
 * Endpoint responsible for deleting user by id.
 * DELETE at: /users/{userId}
 * @param userId - id of the product that should be deleted.
 * @see User
 */
router.delete('/:userId', ensureAuthenticated, async (req, res) => {
    console.log(req.params.userId);
    try {
        const removedUser = await User.deleteOne({_id: req.params.userId});

    } catch (error) {
        console.log(error);
    }
    let users;
    try {
        users = await User.find(); // get all users, there is  option "limit" after limit() ex. User.find().limit(10)
    } catch (error) {
        users = [];
    }
    res.render('listOfUsers2', {users});
});

/**
 * Endpoint responsible for getting all users in the system.
 * GET at: /listOfUsers2
 * @see User
 */
router.get('/userDetails/:userId', ensureAuthenticated, async (req, res) => {
    let user;
    try {
        user = await User.findOne({_id: req.params.userId}); // get specific users, there is  option "limit" after limit() ex. User.find().limit(10)
    } catch (error) {
        user = [];
    }
    res.render('userDetails', {user});
});

module.exports = router;
