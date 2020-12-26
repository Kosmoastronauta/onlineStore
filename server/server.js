/**
 * Main server file, here everything starts.
 * @type {e | (() => Express)}
 */
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv/config');

app.use(bodyparser.json()); // Enabling parsing json model

/**
 * Importing routes/controllers.
 * @type {Router}
 * @see Product
 */
const productRoutes = require('./routes/product');
app.use('/products', productRoutes);

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

/**
 * Setting port where server will be running.
 * @param process.env.PORT - it takes PORT property from .env file.
 * @see .env file
 */
app.listen(process.env.PORT, () => console.log('server is running'));