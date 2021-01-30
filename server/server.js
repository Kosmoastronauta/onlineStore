/**
 * Main server file, here everything starts.
 */
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const router = express.Router();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv/config');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// app.use(cookieParser);
app.use(bodyparser.json()); // Enabling parsing json model
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
// app.use(cookieParser())
app.set('view engine', 'ejs');

require('./config/passport')(passport);

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {secure: false}
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.get('/session', (req,res)=>{
    console.log(req.session.sessionID);
})


// app.use(function (req, res, next){
//     res.locals.session = req.session;
//     next();
// });
// Importing routes/controllers.
/**
 * Router for requests with /products prefix.
 * @type {Router}
 * @see Product
 */
const productRoutes = require('./routes/product');
app.use('/products', productRoutes);

/**
 * Router for requests with /view prefix.
 * Loads views.
 * @see views directory.
 * @type {Router}
 */
const viewRoutes = require('./routes/view');
app.use(viewRoutes);

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// DATABASE
/**
 * @param process.env.DB_CONNECTION_STRING - property from .env file, DB_CONNECTION_STRING is connection string for mongodb,
 * it's just url to the remote database with name of user and password.
 * @see .env file
 */
mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to DB!'))
/**
 * Cross-origin resource sharing (CORS) allows requests to skip the Same-origin policy and access resources from remote hosts.
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

module.exports = router;

/**
 * Setting port where server will be running.
 * @param process.env.PORT - it takes PORT property from .env file.
 * @see .env file
 */
app.listen(process.env.PORT, () => console.log('server is running'));
