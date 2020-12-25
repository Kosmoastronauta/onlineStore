const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv/config');

app.use(bodyparser.json()); // Enabling parsing json model

// Importing routes
const productRoutes = require('./routes/product');
app.use('/products', productRoutes);

// DATABASE
mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to DB!'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//mappings

app.listen(process.env.PORT, () => console.log('server is running'));