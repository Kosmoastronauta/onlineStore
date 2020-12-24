const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//mappings

app.get('/getAll', ((request, response) => console.log('test')));

app.listen(5000, ()=> console.log('server is running'));